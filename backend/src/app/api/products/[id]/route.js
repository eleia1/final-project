import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/products/:id
export async function GET(request, { params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/:id
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { name, price } = body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: { name, price: parseFloat(price) },
  });

  return NextResponse.json(updatedProduct);
}

// DELETE /api/products/:id
export async function DELETE(request, { params }) {
  const { id } = await params;

  await prisma.product.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Product deleted successfully" });
}
