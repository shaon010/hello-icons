"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/session";
import { createCategory, updateCategory, deleteCategory } from "@/lib/data/categories";
import { Prisma } from "@/generated/prisma/client";

export type CategoryFormState = { error?: string } | undefined;

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

export async function createCategoryAction(
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireSession();

  const name = formData.get("name");
  const emoji = formData.get("emoji");

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Name is required" };
  }

  try {
    await createCategory({ name: name.trim(), emoji: typeof emoji === "string" && emoji ? emoji : null });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A category with this name already exists" };
    }
    throw e;
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  id: number,
  _prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireSession();

  const name = formData.get("name");
  const emoji = formData.get("emoji");

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Name is required" };
  }

  try {
    await updateCategory(id, { name: name.trim(), emoji: typeof emoji === "string" && emoji ? emoji : null });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A category with this name already exists" };
    }
    throw e;
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: number): Promise<CategoryFormState> {
  await requireSession();

  try {
    await deleteCategory(id);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && (e.code === "P2003" || e.code === "P2014")) {
      return { error: "This category still has icons. Reassign or delete them first." };
    }
    throw e;
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
