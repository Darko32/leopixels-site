import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'dist/**',
      'node_modules/**',
      // Generated demo output — it is the trades template's hand-written HTML, not app code.
      'public/preview/**',
      'demos/_template/**',
      'next-env.d.ts',
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
