import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
  data: { name: "John Dough", email: `john-${Math.random()}@example.com` },
});

const count = await prisma.user.count();
console.log(`There are ${count} users in the database.`);

await prisma.$disconnect();
