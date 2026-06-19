import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintIgnores = [
  "node_modules/**",
  ".next/**",
  "out/**",
  "build/**",
  ".open-next/**",
  "coverage/**",
  ".vercel/**",
  ".wrangler/**",
  "next-env.d.ts",
  "cloudflare-env.d.ts",
  "pnpm-lock.yaml",
];

const eslintConfig = [
  {
    ignores: eslintIgnores,
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
