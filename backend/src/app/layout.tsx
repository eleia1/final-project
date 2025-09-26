import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Products App",
  description: "Next.js + Prisma Products Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <header className="flex justify-between items-center p-4 border-b shadow-sm">
          <h1 className="text-xl font-bold">🛒 My Store</h1>
          <nav className="flex gap-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
