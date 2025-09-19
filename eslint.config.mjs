import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore-lar
  { ignores: ["node_modules/**", ".next/**", "dist/**", "out/**"] },

  // Next.js + TypeScript qaydaları
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Layihə qaydaları
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "react-hooks/exhaustive-deps": "warn",
      "import/order": ["error", {
        groups: [["builtin", "external", "internal"]],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true }
      }],
      "tailwindcss/classnames-order": "warn"
    },
  },
];

export default eslintConfig;
