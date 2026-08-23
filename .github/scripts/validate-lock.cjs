/**
 * Lockfile consistency check. TEMPORARY, delete with lockfile-repair.yml.
 *
 * Walks every dependency edge recorded in package-lock.json and checks that a
 * satisfying entry exists at a position npm could actually resolve it from,
 * following the node_modules lookup chain upwards exactly as node does.
 *
 * The point is that it is platform-independent. `npm ci` on Windows silently
 * skips the wasm32-wasi fallback bindings, so a lockfile can pass there and
 * fail on Linux with "Missing: <pkg> from lock file". This reports that hole
 * from any machine.
 *
 * Runs with no dependencies. If semver happens to be installed it also checks
 * that resolved versions satisfy their ranges; without it, it still catches
 * edges pointing at packages that are absent entirely, which is the failure
 * this was written for.
 *
 *   node .github/scripts/validate-lock.cjs
 *
 * Exit 0 = consistent. Exit 1 = unsatisfied edges, listed.
 */

/* eslint-disable @typescript-eslint/no-require-imports --
 * This is a standalone CommonJS script, not application source. It runs with
 * `node` before any install has happened, so it cannot use the project's ESM
 * or TypeScript toolchain, and require() is the only option available to it. */

const path = require('node:path');

const lockPath = path.join(process.cwd(), 'package-lock.json');
let lock;
try {
  lock = require(lockPath);
} catch (error) {
  console.error('Could not read package-lock.json at ' + lockPath);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}

const packages = lock.packages;
if (!packages) {
  console.error('This lockfile has no "packages" map. lockfileVersion 2 or 3 is required.');
  process.exit(2);
}

/** semver is optional: absent before an install has run. */
let semver = null;
try {
  semver = require(path.join(process.cwd(), 'node_modules', 'semver'));
} catch {
  semver = null;
}

/**
 * Resolve `name` as required by the package at `fromKey`, walking up the
 * node_modules chain the way node's resolution algorithm does.
 */
function resolveFrom(fromKey, name) {
  let prefix = fromKey;
  for (;;) {
    const candidate = (prefix ? prefix + '/' : '') + 'node_modules/' + name;
    if (packages[candidate]) {
      return { key: candidate, version: packages[candidate].version };
    }
    if (!prefix) return null;
    const index = prefix.lastIndexOf('/node_modules/');
    prefix = index === -1 ? '' : prefix.slice(0, index);
  }
}

const problems = [];

for (const [key, meta] of Object.entries(packages)) {
  for (const field of ['dependencies', 'optionalDependencies']) {
    for (const [name, range] of Object.entries(meta[field] || {})) {
      // A link or workspace entry has no registry range to satisfy.
      if (typeof range !== 'string' || range.startsWith('file:') || range.startsWith('link:')) {
        continue;
      }

      const found = resolveFrom(key, name);

      if (!found) {
        problems.push({ from: key || '<root>', name, range, got: 'NOT IN LOCK' });
        continue;
      }

      if (semver && found.version && !semver.satisfies(found.version, range, { includePrerelease: true })) {
        problems.push({
          from: key || '<root>',
          name,
          range,
          got: found.version + ' at ' + found.key,
        });
      }
    }
  }
}

console.log('lockfileVersion : ' + lock.lockfileVersion);
console.log('packages        : ' + Object.keys(packages).length);
console.log('range checking  : ' + (semver ? 'on (semver available)' : 'off (semver not installed, presence only)'));

if (problems.length === 0) {
  console.log('\nLOCK CONSISTENT: every dependency edge resolves to a satisfying entry.');
  process.exit(0);
}

console.log('\nLOCK INCONSISTENT: ' + problems.length + ' unsatisfied edge(s)\n');
for (const problem of problems) {
  console.log('  ' + problem.from);
  console.log('      needs ' + problem.name + '@' + problem.range + '  ->  ' + problem.got);
}
console.log('\nRegenerate the lockfile on Linux. See .github/workflows/lockfile-repair.yml');
process.exit(1);
