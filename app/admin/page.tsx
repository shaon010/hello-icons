import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [iconCount, categoryCount] = await Promise.all([
    prisma.icon.count(),
    prisma.category.count(),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/admin/icons"
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Icons</p>
          <p className="mt-2 text-4xl font-bold text-gray-900">{iconCount}</p>
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Categories</p>
          <p className="mt-2 text-4xl font-bold text-gray-900">{categoryCount}</p>
        </Link>
      </div>
    </div>
  );
}
