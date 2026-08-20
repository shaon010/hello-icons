import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { slugify } from "@/lib/slugify";

const UPLOAD_DIR = path.join(process.cwd(), "public", "icons", "uploads");
const UPLOAD_URL_PREFIX = "/icons/uploads/";

export class InvalidSvgError extends Error {}

export async function readAndSanitizeSvg(file: File): Promise<string> {
  const raw = await file.text();
  const trimmed = raw.replace(/^﻿/, "").trim();

  if (!/^(<\?xml[^>]*>\s*)?<svg[\s>]/i.test(trimmed)) {
    throw new InvalidSvgError("File does not look like a valid SVG");
  }
  if (/<foreignObject/i.test(trimmed)) {
    throw new InvalidSvgError("SVG must not contain <foreignObject>");
  }

  return trimmed
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/(href|xlink:href)\s*=\s*"\s*javascript:[^"]*"/gi, "")
    .replace(/(href|xlink:href)\s*=\s*'\s*javascript:[^']*'/gi, "");
}

export function buildSafeFilename(name: string): string {
  const base = slugify(name) || "icon";
  const suffix = randomBytes(4).toString("hex");
  return `${base}-${suffix}.svg`;
}

export async function saveSvgFile(filename: string, content: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), content, "utf-8");
  return `${UPLOAD_URL_PREFIX}${filename}`;
}

export async function deleteSvgFile(svgPath: string): Promise<void> {
  if (!svgPath.startsWith(UPLOAD_URL_PREFIX)) return;
  const filename = svgPath.slice(UPLOAD_URL_PREFIX.length);
  if (filename.includes("/") || filename.includes("..")) return;
  await unlink(path.join(UPLOAD_DIR, filename)).catch(() => {});
}
