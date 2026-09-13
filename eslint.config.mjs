import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Feature-Sliced Design layer hierarchy, highest first:
 *
 *   app -> views -> widgets -> features -> entities -> shared
 *
 * A layer may only import from layers strictly BELOW it, and (except for
 * `shared`, which has segments rather than slices) slices within the same
 * layer may not import each other. Code that two slices both need belongs
 * one layer down.
 *
 * `views` is FSD's "pages" layer. It cannot be called `pages/` here: a
 * top-level pages/ directory is the Next.js Pages Router and its files
 * would be treated as routes.
 *
 * Own-slice imports use relative paths, so blocking "@/<layer>/*" from
 * inside that same layer only catches cross-slice imports.
 */
const LAYERS = ["views", "widgets", "features", "entities", "shared"];

const boundaries = LAYERS.map((layer, index) => {
  const above = ["app", ...LAYERS.slice(0, index)];
  const siblings = layer === "shared" ? [] : [`@/${layer}/*`];

  return {
    files: [`${layer}/**/*.{ts,tsx}`],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            ...(siblings.length
              ? [
                  {
                    group: siblings,
                    message: `FSD: "${layer}" slices must not import each other. Move the shared code down a layer.`,
                  },
                ]
              : []),
            {
              group: above.map((l) => `@/${l}/*`),
              message: `FSD: "${layer}" may only import from layers below it. "${above.join('", "')}" ${
                above.length === 1 ? "is" : "are"
              } above it.`,
            },
          ],
        },
      ],
    },
  };
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...boundaries,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
