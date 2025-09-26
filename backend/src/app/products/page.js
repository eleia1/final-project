"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Products</h1>
        <Link
          href="/"
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back to Home
        </Link>
      </header>

      {/* Main Section */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">All Products</h2>
          <Link
            href="/products/add"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            <Plus size={18} /> Add New
          </Link>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">${product.price}</td>
                    <td className="py-3 px-4">{product.category || "N/A"}</td>
                    <td className="py-3 px-4 flex gap-3">
                      <Link href={`/products/${product.id}/view`}>
                        <Eye size={18} className="cursor-pointer hover:text-blue-500" />
                      </Link>
                      <Link href={`/products/${product.id}/edit`}>
                        <Pencil size={18} className="cursor-pointer hover:text-green-500" />
                      </Link>
                      <button
                        onClick={async () => {
                          await fetch(`/api/products/${product.id}`, {
                            method: "DELETE",
                          });
                          setProducts(products.filter((p) => p.id !== product.id));
                        }}
                      >
                        <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-4 text-center" colSpan={4}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
