import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/products → يرجع كل المنتجات
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products → يضيف منتج جديد
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: { name, price: parseFloat(price) },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
