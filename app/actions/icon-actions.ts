"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/session";
import { createIcon, updateIcon, deleteIcon, getIconById } from "@/lib/data/icons";
import { readAndSanitizeSvg, buildSafeFilename, saveSvgFile, deleteSvgFile, InvalidSvgError } from "@/lib/svg";

export type IconFormState = { error?: string } | undefined;

function revalidatePublicRoutes() {
  revalidatePath("/");
  revalidatePath("/icons");
  revalidatePath("/categories");
}

async function requireSession() {
  if (!(await verifySession())) {
    throw new Error("Not authenticated");
  }
}

export async function createIconAction(_prevState: IconFormState, formData: FormData): Promise<IconFormState> {
  await requireSession();

  const name = formData.get("name");
  const categoryId = formData.get("categoryId");
  const file = formData.get("svg");

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Name is required" };
  }
  if (typeof categoryId !== "string" || !categoryId) {
    return { error: "Category is required" };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "An SVG file is required" };
  }

  let sanitized: string;
  try {
    sanitized = await readAndSanitizeSvg(file);
  } catch (e) {
    if (e instanceof InvalidSvgError) return { error: e.message };
    throw e;
  }

  const filename = buildSafeFilename(name);
  const svgPath = await saveSvgFile(filename, sanitized);

  await createIcon({ name: name.trim(), categoryId: Number(categoryId), svgPath });

  revalidatePublicRoutes();
  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}

export async function updateIconAction(
  id: number,
  _prevState: IconFormState,
  formData: FormData
): Promise<IconFormState> {
  await requireSession();

  const name = formData.get("name");
  const categoryId = formData.get("categoryId");
  const file = formData.get("svg");

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Name is required" };
  }
  if (typeof categoryId !== "string" || !categoryId) {
    return { error: "Category is required" };
  }

  let svgPath: string | undefined;
  if (file instanceof File && file.size > 0) {
    let sanitized: string;
    try {
      sanitized = await readAndSanitizeSvg(file);
    } catch (e) {
      if (e instanceof InvalidSvgError) return { error: e.message };
      throw e;
    }
    const filename = buildSafeFilename(name);
    svgPath = await saveSvgFile(filename, sanitized);
  }

  const existing = await getIconById(id);
  await updateIcon(id, { name: name.trim(), categoryId: Number(categoryId), svgPath });

  if (svgPath && existing) {
    await deleteSvgFile(existing.svgPath);
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}

export async function deleteIconAction(id: number): Promise<void> {
  await requireSession();
  const deleted = await deleteIcon(id);
  await deleteSvgFile(deleted.svgPath);
  revalidatePublicRoutes();
  revalidatePath("/admin/icons");
  redirect("/admin/icons");
}
