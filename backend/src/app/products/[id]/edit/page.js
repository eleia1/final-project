"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({ name: "", price: "", category: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
      });
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    router.push(`/products/${id}/view`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Edit Product</h1>
        <a
          href={`/products/${id}/view`}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Back
        </a>
      </header>

      <main className="flex justify-center items-center py-10 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md border rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Update Product</h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full border px-4 py-2 rounded mb-4"
            value={product.name || ""}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border px-4 py-2 rounded mb-4"
            value={product.price || ""}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full border px-4 py-2 rounded mb-4"
            value={product.category || ""}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}
