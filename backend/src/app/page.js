import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to My Store 🛒
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Manage products with Next.js & Prisma
        </p>
        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          View Products
        </Link>
      </main>
    </div>
  );
}
