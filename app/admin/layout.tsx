import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySession } from "@/lib/auth/session";
import { logoutAction } from "@/app/actions/auth-actions";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const isAuthed = await verifySession();
  if (!isAuthed) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-xl font-bold text-gray-900">
            Admin
          </Link>
          <nav className="flex items-center gap-6 text-gray-700 font-medium">
            <Link href="/admin/icons" className="hover:text-blue-600">Icons</Link>
            <Link href="/admin/categories" className="hover:text-blue-600">Categories</Link>
            <Link href="/" className="hover:text-blue-600">View Site</Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
