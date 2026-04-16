import { NextRequest, NextResponse } from "next/server";
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const CONFIGS_ROOT = join(process.cwd(), "public", "images", "cashpo", "configs");

/** Maps shape to folder name */
const shapeFolderMap: Record<string, string> = {
  narrow: "узкое",
  square: "квадратное",
  rect: "прямоугольное",
};

/** Maps finish to folder name */
const finishFolderMap: Record<string, string> = {
  natural: "natural",
  oak_stain: "oak-stain",
  rosewood_stain: "rosewood-stain",
};

/**
 * Get the next available photo number in the originals folder.
 * Scans existing files and returns the next sequential number.
 */
function getNextPhotoNumber(originalsPath: string): number {
  if (!existsSync(originalsPath)) {
    return 1;
  }

  const files = readdirSync(originalsPath);
  const numbers = files
    .map((f) => {
      const match = f.match(/^(\d+)\./);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((n): n is number => n !== null);

  return numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
}

/**
 * Convert an original image to thumbnails/medium/large using ImageMagick.
 */
function convertImage(
  originalPath: string,
  targetDir: string,
  fileName: string
) {
  const tiers = [
    { dir: "thumbnails", size: 600, quality: 85 },
    { dir: "medium", size: 1600, quality: 85 },
    { dir: "large", size: 2800, quality: 85 },
  ];

  for (const tier of tiers) {
    const tierPath = join(targetDir, tier.dir);
    mkdirSync(tierPath, { recursive: true });

    const outputPath = join(tierPath, fileName.replace(/\.\w+$/, ".webp"));

    try {
      execSync(
        `magick "${originalPath}" -resize "${tier.size}x${tier.size}>" -quality ${tier.quality} "${outputPath}"`,
        { stdio: "pipe" }
      );
    } catch (err) {
      console.error(`Failed to convert ${fileName} to ${tier.dir}:`, err);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const shape = formData.get("shape") as string;
    const size = formData.get("size") as string | null; // Only for narrow
    const finish = formData.get("finish") as string;
    const files = formData.getAll("files") as File[];

    if (!shape || !finish || files.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: shape, finish, files" },
        { status: 400 }
      );
    }

    // Build folder path
    const shapeFolder = shapeFolderMap[shape] || shape;
    const sizeSuffix =
      shape === "narrow" && size ? `-${size.toUpperCase()}` : "";
    const finishFolder = finishFolderMap[finish] || finish;

    const variantFolder = `${shapeFolder}${sizeSuffix}`;
    const targetDir = join(CONFIGS_ROOT, variantFolder, finishFolder);
    const originalsPath = join(targetDir, "originals");

    mkdirSync(originalsPath, { recursive: true });

    const savedFiles: { originalName: string; savedAs: string; number: number }[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const nextNumber = getNextPhotoNumber(originalsPath);
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${nextNumber}.${ext}`;
      const filePath = join(originalsPath, fileName);

      const buffer = Buffer.from(await file.arrayBuffer());
      writeFileSync(filePath, buffer);

      // Convert to all tiers
      convertImage(filePath, targetDir, fileName);

      savedFiles.push({
        originalName: file.name,
        savedAs: fileName,
        number: nextNumber,
      });
    }

    return NextResponse.json({
      success: true,
      uploaded: savedFiles,
      folder: `${variantFolder}/${finishFolder}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
