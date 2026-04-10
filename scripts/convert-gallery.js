/**
 * Convert images from originals/ to thumbnails, medium, large as WebP.
 * Uses ImageMagick (magick CLI) — supports NEF, CR2, ARW, JPEG, PNG.
 * 
 * Usage: node scripts/convert-gallery.js
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const CONFIGS_ROOT = "public/images/cashpo/configs";

/** Find ImageMagick on Windows */
function findMagick() {
  const candidates = [
    "C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe",
    "C:\\Program Files\\ImageMagick-7.1.2-Q16\\magick.exe",
    "C:\\Program Files\\ImageMagick-7.1.1-Q16\\magick.exe",
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  // fallback: try PATH
  try {
    execSync("magick -version", { stdio: "pipe" });
    return "magick";
  } catch {}
  return null;
}

const MAGICK = findMagick();
if (!MAGICK) {
  console.error("ImageMagick not found. Install it: winget install ImageMagick.ImageMagick");
  process.exit(1);
}
console.log(`Using ImageMagick: ${MAGICK}`);

const SIZES = {
  thumbnails: 600,
  medium: 1600,
  large: 2800,
};

/** All extensions ImageMagick can read (RAW + common) */
const ORIGINALS_EXT = [".nef", ".cr2", ".arw", ".raf", ".orf", ".dng", ".jpg", ".jpeg", ".png", ".webp", ".tiff", ".tif"];

function getFiles(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => exts.includes(path.extname(f).toLowerCase()));
}

function convertImages() {
  const configsRoot = path.resolve(CONFIGS_ROOT);
  if (!fs.existsSync(configsRoot)) {
    console.error(`Configs root not found: ${configsRoot}`);
    process.exit(1);
  }

  const shapeFolders = fs.readdirSync(configsRoot);
  let totalConverted = 0;

  for (const shapeFolder of shapeFolders) {
    const shapePath = path.join(configsRoot, shapeFolder);
    if (!fs.statSync(shapePath).isDirectory()) continue;

    const finishFolders = fs.readdirSync(shapePath);
    for (const finishFolder of finishFolders) {
      const finishPath = path.join(shapePath, finishFolder);
      if (!fs.statSync(finishPath).isDirectory()) continue;

      const originalsDir = path.join(finishPath, "originals");
      const originals = getFiles(originalsDir, ORIGINALS_EXT);

      // Skip if all output sizes already exist
      let allExist = true;
      if (originals.length > 0) {
        for (let i = 0; i < originals.length && allExist; i++) {
          for (const sizeName of Object.keys(SIZES)) {
            const outFile = path.join(finishPath, sizeName, `${i + 1}.webp`);
            if (!fs.existsSync(outFile)) {
              allExist = false;
              break;
            }
          }
        }
      }
      if (allExist && originals.length > 0) {
        console.log(`  Already converted: ${shapeFolder}/${finishFolder}`);
        continue;
      }

      if (originals.length === 0) {
        console.log(`  Skip ${shapeFolder}/${finishFolder} — no originals`);
        continue;
      }

      console.log(`\n${shapeFolder}/${finishFolder}: ${originals.length} original(s)`);

      for (let i = 0; i < originals.length; i++) {
        const srcFile = path.resolve(originalsDir, originals[i]);
        const num = i + 1;

        for (const [sizeName, maxSize] of Object.entries(SIZES)) {
          const outDir = path.join(finishPath, sizeName);
          const outFile = path.join(outDir, `${num}.webp`);
          
          // Skip if already exists
          if (fs.existsSync(outFile)) {
            const stats = fs.statSync(outFile);
            console.log(`  [skip] ${sizeName}/${num}.webp already exists — ${(stats.size / 1024).toFixed(0)} KB`);
            totalConverted++;
            continue;
          }

          fs.mkdirSync(outDir, { recursive: true });

          try {
            execSync(
              `"${MAGICK}" "${srcFile}" -auto-orient -resize ${maxSize}x${maxSize} -quality 85 "${outFile}"`,
              { stdio: "pipe" }
            );

            const stats = fs.statSync(outFile);
            console.log(`  ${sizeName}/${num}.webp — ${(stats.size / 1024).toFixed(0)} KB`);
            totalConverted++;
          } catch (err) {
            const stderr = err.stderr?.toString() || err.message || "";
            console.error(`  Error converting ${originals[i]} -> ${sizeName}/${num}.webp`);
            console.error(`    ${stderr.split("\n")[0]}`);
          }
        }
      }
    }
  }

  console.log(`\nDone! Converted ${totalConverted} images.`);
}

convertImages();
