/**
 * Run AFTER download-images.mjs.
 * Replaces all Builder.io TEMP image URLs in components with local /images/ paths.
 *
 *   node scripts/update-image-paths.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const REPLACEMENTS = [
  // Gazette
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/8469382136ac7d950cd43c8ce1fa20ef63975472?width=3532",
    to: "/images/gazette/hero-bg.jpg",
  },
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/35f80b4852d3b0f3cc3880dfe66322c0a324b1b4?width=1082",
    to: "/images/gazette/cover-1.jpg",
  },
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/69cfc63ec1bc1c07ddf5cdb1894e5d8aab377554?width=1082",
    to: "/images/gazette/cover-2.jpg",
  },
  // Magazine
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/02793c57941b1dcc29282bec2e73a449eb6cd5e2?width=3532",
    to: "/images/magazine/hero-bg.jpg",
  },
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/1b24559f19361befa01282cb6d7a541677d24b5d?width=1082",
    to: "/images/magazine/cover-1.jpg",
  },
  {
    from: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=1082",
    to: "/images/magazine/cover-2.jpg",
  },
];

const FILES = [
  "components/gazette/GazetteHero.tsx",
  "components/gazette/GazetteGrid.tsx",
  "components/magazine/MagazineHero.tsx",
  "components/magazine/MagazineGrid.tsx",
];

let totalChanges = 0;

for (const relPath of FILES) {
  const filePath = path.join(root, relPath);
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const { from, to } of REPLACEMENTS) {
    if (content.includes(from)) {
      content = content.replaceAll(from, to);
      changed = true;
      totalChanges++;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`  ✓  Updated: ${relPath}`);
  }
}

console.log(`\nDone! ${totalChanges} URL(s) replaced across ${FILES.length} file(s).`);
