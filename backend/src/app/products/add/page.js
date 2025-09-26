"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category }),
    });
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Add Product</h1>
        <a
          href="/products"
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </a>
      </header>

      {/* Form */}
      <main className="flex justify-center items-center py-10 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">New Product</h2>

          <input
            type="text"
            placeholder="Product Name"
            className="w-full border px-4 py-2 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border px-4 py-2 rounded mb-4"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border px-4 py-2 rounded mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
}
