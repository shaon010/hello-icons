import Link from "next/link";
import Image from "next/image";
import { getIcons } from "@/lib/data/icons";
import DeleteIconButton from "@/components/admin/DeleteIconButton";

export default async function AdminIconsPage() {
  const icons = await getIcons();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Icons</h1>
        <Link
          href="/admin/icons/new"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          New Icon
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-3">Preview</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {icons.map((icon) => (
              <tr key={icon.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4">
                  <Image src={icon.svgPath} alt={icon.name} width={32} height={32} className="h-8 w-8" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{icon.name}</td>
                <td className="px-6 py-4 text-gray-500">{icon.category.name}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/icons/${icon.id}/edit`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <DeleteIconButton id={icon.id} />
                  </div>
                </td>
              </tr>
            ))}
            {icons.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No icons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
