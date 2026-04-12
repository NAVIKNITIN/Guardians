/**
 * Run this once to download all Figma TEMP images into public/images/
 *
 *   node scripts/download-images.mjs
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const IMAGES = [
  // ── Gazette ──────────────────────────────────────────────────────────
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/8469382136ac7d950cd43c8ce1fa20ef63975472?width=3532",
    dest: "public/images/gazette/hero-bg.jpg",
    label: "Gazette hero background",
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/35f80b4852d3b0f3cc3880dfe66322c0a324b1b4?width=1082",
    dest: "public/images/gazette/cover-1.jpg",
    label: "Gazette card cover 1",
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/69cfc63ec1bc1c07ddf5cdb1894e5d8aab377554?width=1082",
    dest: "public/images/gazette/cover-2.jpg",
    label: "Gazette card cover 2",
  },

  // ── Magazine ─────────────────────────────────────────────────────────
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/02793c57941b1dcc29282bec2e73a449eb6cd5e2?width=3532",
    dest: "public/images/magazine/hero-bg.jpg",
    label: "Magazine hero background",
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/1b24559f19361befa01282cb6d7a541677d24b5d?width=1082",
    dest: "public/images/magazine/cover-1.jpg",
    label: "Magazine card cover 1",
  },
  {
    url: "https://api.builder.io/api/v1/image/assets/TEMP/a0aec7389b59c267fe9e6cb147a75e605ac97963?width=1082",
    dest: "public/images/magazine/cover-2.jpg",
    label: "Magazine card cover 2",
  },
];

function download(url, destRel) {
  const dest = path.join(root, destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    const get = (u) =>
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`HTTP ${res.statusCode} for ${u}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(dest);
        });
      });

    get(url);
    file.on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

console.log(`Downloading ${IMAGES.length} images…\n`);

for (const img of IMAGES) {
  try {
    await download(img.url, img.dest);
    console.log(`  ✓  ${img.label}  →  ${img.dest}`);
  } catch (err) {
    console.error(`  ✗  ${img.label}: ${err.message}`);
  }
}

console.log("\nDone! Next step: update component src paths to use /images/… paths.");
console.log("Run: node scripts/update-image-paths.mjs");
