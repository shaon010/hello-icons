import Link from "next/link";

const categories = [
  {
    name: "Business",
    icon: "💼",
    count: "2,450 Icons",
    href: "/categories/business",
  },
  {
    name: "Technology",
    icon: "💻",
    count: "1,980 Icons",
    href: "/categories/technology",
  },
  {
    name: "Finance",
    icon: "💰",
    count: "1,320 Icons",
    href: "/categories/finance",
  },
  {
    name: "Medical",
    icon: "🏥",
    count: "980 Icons",
    href: "/categories/medical",
  },
  {
    name: "Education",
    icon: "🎓",
    count: "1,120 Icons",
    href: "/categories/education",
  },
  {
    name: "Social",
    icon: "📱",
    count: "850 Icons",
    href: "/categories/social",
  },
  {
    name: "Shopping",
    icon: "🛒",
    count: "730 Icons",
    href: "/categories/shopping",
  },
  {
    name: "Travel",
    icon: "✈️",
    count: "640 Icons",
    href: "/categories/travel",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold uppercase tracking-wide">
            Categories
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Browse by Category
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore thousands of premium SVG icons organized into popular
            categories for designers and developers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-5">
                {category.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {category.name}
              </h3>

              <p className="mt-2 text-gray-500">
                {category.count}
              </p>

              <div className="mt-6 text-blue-600 font-medium">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}