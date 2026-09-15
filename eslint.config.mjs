import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Feature-Sliced Design rules, enforced rather than documented.
 *
 * Layer hierarchy, highest first:
 *
 *   app -> views -> widgets -> features -> entities -> shared
 *
 * Two rules are checked:
 *
 * 1. Layer direction — a layer may only import from layers strictly below
 *    it, and (outside `shared`) slices in the same layer may not import
 *    each other. Code two slices both need belongs one layer down.
 *
 * 2. Public API — a slice may only be imported through its index.ts.
 *    Reaching past it couples callers to internals and is what makes a
 *    structure impossible to move later.
 *
 * `shared` is exempt from the public API rule: it is organised into
 * segments rather than slices, so "@/shared/ui" and "@/shared/lib/cn" are
 * its intended entry points.
 *
 * `views` is FSD's "pages" layer. It cannot be called `pages/` here: a
 * top-level pages/ directory is the Next.js Pages Router and its files
 * would be picked up as routes.
 *
 * Both rules are expressed as patterns of a single `no-restricted-imports`
 * entry per layer. They must be merged into one entry, because a later
 * flat-config block replaces a rule's options rather than merging them.
 */
const LAYERS = ["views", "widgets", "features", "entities", "shared"];
const SLICED_LAYERS = ["views", "widgets", "features", "entities"];

/** Blocks reaching past a slice's index.ts. */
const publicApiPattern = {
  group: SLICED_LAYERS.flatMap((layer) => [`@/${layer}/*/*`, `@/${layer}/*/*/**`]),
  message:
    'FSD: import a slice through its index.ts, not its internals. Use "@/widgets/hero", not "@/widgets/hero/ui/Hero".',
};

function restrictedImports(patterns) {
  return { "no-restricted-imports": ["error", { patterns }] };
}

// `app` is the top layer: it may import anything below, but still owes the
// public API rule.
const appBoundary = {
  files: ["app/**/*.{ts,tsx}"],
  rules: restrictedImports([publicApiPattern]),
};

const layerBoundaries = LAYERS.map((layer, index) => {
  const above = ["app", ...LAYERS.slice(0, index)];
  const siblings = layer === "shared" ? [] : [`@/${layer}/*`];

  return {
    files: [`${layer}/**/*.{ts,tsx}`],
    rules: restrictedImports([
      publicApiPattern,
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
    ]),
  };
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  appBoundary,
  ...layerBoundaries,
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
