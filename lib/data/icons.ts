import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import type { IconItem } from "@/types/icon";

const withCategory = { category: true } as const;

type IconRow = {
  id: number;
  name: string;
  slug: string;
  svgPath: string;
  category: { id: number; name: string; slug: string; emoji: string | null };
};

function toIconItem(row: IconRow): IconItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    svgPath: row.svgPath,
    category: row.category,
  };
}

export async function getIcons(): Promise<IconItem[]> {
  const rows = await prisma.icon.findMany({
    orderBy: { name: "asc" },
    include: withCategory,
  });
  return rows.map(toIconItem);
}

export async function getIconsByCategory(categoryId: number): Promise<IconItem[]> {
  const rows = await prisma.icon.findMany({
    where: { categoryId },
    orderBy: { name: "asc" },
    include: withCategory,
  });
  return rows.map(toIconItem);
}

export async function getIconById(id: number): Promise<IconItem | null> {
  const row = await prisma.icon.findUnique({ where: { id }, include: withCategory });
  return row ? toIconItem(row) : null;
}

export async function createIcon(input: {
  name: string;
  categoryId: number;
  svgPath: string;
}): Promise<IconItem> {
  const row = await prisma.icon.create({
    data: {
      name: input.name,
      slug: slugify(input.name),
      categoryId: input.categoryId,
      svgPath: input.svgPath,
    },
    include: withCategory,
  });
  return toIconItem(row);
}

export async function updateIcon(
  id: number,
  input: { name: string; categoryId: number; svgPath?: string }
): Promise<IconItem> {
  const row = await prisma.icon.update({
    where: { id },
    data: {
      name: input.name,
      slug: slugify(input.name),
      categoryId: input.categoryId,
      ...(input.svgPath ? { svgPath: input.svgPath } : {}),
    },
    include: withCategory,
  });
  return toIconItem(row);
}

export async function deleteIcon(id: number): Promise<IconItem> {
  const row = await prisma.icon.delete({ where: { id }, include: withCategory });
  return toIconItem(row);
}
