import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import type { Category } from "@/types/icon";

function toCategory(row: { id: number; name: string; slug: string; emoji: string | null }): Category {
  return { id: row.id, name: row.name, slug: row.slug, emoji: row.emoji };
}

export async function getCategories(): Promise<(Category & { iconCount: number })[]> {
  const rows = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { icons: true } } },
  });
  return rows.map((row) => ({ ...toCategory(row), iconCount: row._count.icons }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const row = await prisma.category.findUnique({ where: { slug } });
  return row ? toCategory(row) : null;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const row = await prisma.category.findUnique({ where: { id } });
  return row ? toCategory(row) : null;
}

export async function createCategory(input: { name: string; emoji?: string | null }): Promise<Category> {
  const row = await prisma.category.create({
    data: { name: input.name, slug: slugify(input.name), emoji: input.emoji ?? null },
  });
  return toCategory(row);
}

export async function updateCategory(
  id: number,
  input: { name: string; emoji?: string | null }
): Promise<Category> {
  const row = await prisma.category.update({
    where: { id },
    data: { name: input.name, slug: slugify(input.name), emoji: input.emoji ?? null },
  });
  return toCategory(row);
}

export async function deleteCategory(id: number): Promise<void> {
  await prisma.category.delete({ where: { id } });
}
