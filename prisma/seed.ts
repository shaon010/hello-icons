import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const HARDCODED_ICONS = [
  { name: "Home", svgPath: "/icons/home.svg" },
  { name: "Home2", svgPath: "/icons/home2.svg" },
  { name: "Home3", svgPath: "/icons/home3.svg" },
  { name: "Home4", svgPath: "/icons/home4.svg" },
  { name: "Home5", svgPath: "/icons/home5.svg" },
];

async function main() {
  const uiCategory = await prisma.category.upsert({
    where: { slug: "ui" },
    update: {},
    create: { name: "UI", slug: "ui", emoji: "🧩" },
  });

  for (const icon of HARDCODED_ICONS) {
    await prisma.icon.upsert({
      where: { slug: icon.name.toLowerCase() },
      update: {},
      create: {
        name: icon.name,
        slug: icon.name.toLowerCase(),
        svgPath: icon.svgPath,
        categoryId: uiCategory.id,
      },
    });
  }

  console.log(`Seeded category "${uiCategory.name}" with ${HARDCODED_ICONS.length} icons.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
