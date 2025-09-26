"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ViewProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Product Details</h1>
        <a
          href="/products"
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </a>
      </header>

      {/* Product Card */}
      <main className="flex justify-center items-center py-10 px-6">
        <div className="w-full max-w-md border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">{product.name}</h2>

          <p className="mb-4">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>

          <p className="mb-6">
            <span className="font-semibold">Category:</span>{" "}
            {product.category || "N/A"}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/products/${id}/edit`)}
              className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Edit
            </button>
            <button
              onClick={async () => {
                await fetch(`/api/products/${id}`, { method: "DELETE" });
                router.push("/products");
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
