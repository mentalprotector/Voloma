import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync, renameSync } from "fs";
import { join } from "path";

const CONFIG_PATH = join(
  process.cwd(),
  "public",
  "images",
  "cashpo",
  "configs",
  "image-order.json"
);

const CONFIGS_ROOT = join(process.cwd(), "public", "images", "cashpo", "configs");

const shapeFolderMap: Record<string, string> = {
  narrow: "узкое",
  square: "квадратное",
  rect: "прямоугольное",
};

export async function GET() {
  try {
    if (!existsSync(CONFIG_PATH)) {
      return NextResponse.json(
        { error: "Config file not found" },
        { status: 404 }
      );
    }
    const raw = readFileSync(CONFIG_PATH, "utf-8");
    const config = JSON.parse(raw);
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read config", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Invalid config format" },
        { status: 400 }
      );
    }

    writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2) + "\n", "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save config", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { shape, size, finish, photoNumber } = body;

    if (!shape || !finish || !photoNumber) {
      return NextResponse.json(
        { error: "Missing required fields: shape, finish, photoNumber" },
        { status: 400 }
      );
    }

    // Build folder path
    const shapeFolder = shapeFolderMap[shape] || shape;
    const sizeSuffix = shape === "narrow" && size ? `-${size.toUpperCase()}` : "";
    const variantFolder = `${shapeFolder}${sizeSuffix}`;
    const targetDir = join(CONFIGS_ROOT, variantFolder, finish);

    // Delete files
    const deleted: string[] = [];
    const tiers = ["originals", "thumbnails", "medium", "large"];

    for (const tier of tiers) {
      const tierPath = join(targetDir, tier);
      if (!existsSync(tierPath)) continue;

      // Find all files matching this photo number (any extension)
      const files = readdirSync(tierPath);
      for (const file of files) {
        const match = file.match(new RegExp(`^${photoNumber}\\.`));
        if (match) {
          const filePath = join(tierPath, file);
          unlinkSync(filePath);
          deleted.push(`${tier}/${file}`);
        }
      }
    }

    // Also renumber remaining originals to keep sequential
    const originalsPath = join(targetDir, "originals");
    if (existsSync(originalsPath)) {
      const originals = readdirSync(originalsPath)
        .filter((f) => /^\d+\./.test(f))
        .sort((a, b) => {
          const numA = parseInt(a.match(/^(\d+)/)?.[1] || "0", 10);
          const numB = parseInt(b.match(/^(\d+)/)?.[1] || "0", 10);
          return numA - numB;
        });

      // Renumber sequentially
      for (let i = 0; i < originals.length; i++) {
        const oldName = originals[i];
        const ext = oldName.split(".").pop();
        const newName = `${i + 1}.${ext}`;
        if (oldName !== newName) {
          renameFile(join(originalsPath, oldName), join(originalsPath, newName));
        }
      }
    }

    return NextResponse.json({
      success: true,
      deleted,
      message: `Photo ${photoNumber} deleted from ${variantFolder}/${finish}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed", details: String(error) },
      { status: 500 }
    );
  }
}

function renameFile(oldPath: string, newPath: string) {
  try {
    renameSync(oldPath, newPath);
  } catch (e) {
    console.error(`Failed to rename ${oldPath} to ${newPath}:`, e);
  }
}
