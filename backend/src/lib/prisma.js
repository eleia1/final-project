import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis;

let prisma = globalForPrisma.__prisma;

if (!prisma) {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__prisma = prisma;
  }
}

export default prisma;
