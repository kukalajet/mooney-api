import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Use LLMs to figure out if any other category is needed:
const transactionCategories = [
  { name: "Miscellaneous" },
  { name: "Entertainment" },
  { name: "Food & Drink" },
  { name: "Housing" },
  { name: "Savings" },
  { name: "Transportation" },
];
const transactionCategoryTypes = {
  Miscellaneous: [
    { name: "Bank cost" },
    { name: "Clothes" },
    { name: "Healthcare" },
    { name: "Miscellaneous" },
    { name: "Student loan" },
    { name: "Unknown" },
  ],
  Entertainment: [
    { name: "Bowling" },
    { name: "Cinema" },
    { name: "Concert" },
    { name: "Electronics" },
    { name: "Entertainment" },
    { name: "Gym" },
    { name: "Hobby" },
    { name: "Nightclub" },
    { name: "Sports" },
    { name: "Subscription" },
    { name: "Vacation" },
  ],
  "Food & Drink": [
    { name: "Candy" },
    { name: "Coffee" },
    { name: "Drinks" },
    { name: "Food" },
    { name: "Groceries" },
    { name: "Restaurant" },
  ],
  Housing: [
    { name: "Bank" },
    { name: "Bills" },
    { name: "Electricity" },
    { name: "Home supplies" },
    { name: "Housing" },
    { name: "Insurance" },
    { name: "Internet" },
    { name: "Loan" },
    { name: "Maintenance" },
    { name: "Rent" },
    { name: "Service" },
    { name: "TV" },
  ],
  Savings: [
    { name: "Emergency savings" },
    { name: "Savings" },
    { name: "Vacation savings" },
  ],
  Transportation: [
    { name: "Car costs" },
    { name: "Car insurance" },
    { name: "Car loan" },
    { name: "Flight" },
    { name: "Gas" },
    { name: "Parking" },
    { name: "Public transport" },
    { name: "Repair" },
    { name: "Taxi" },
    { name: "Transportation" },
  ],
};
const users = [
  { name: "John Doe", email: "john.doe@email.com" },
  { name: "Jane Smith", email: "jane.smith@email.com" },
  { name: "Robert Johnson", email: "robert.johnson@email.com" },
  { name: "Michael Williams", email: "michael.williams@email.com" },
  { name: "Sarah Jones", email: "sarah.jones@email.com" },
  { name: "Jessica Brown", email: "jessica.brown@email.com" },
  { name: "Thomas Davis", email: "thomas.davis@email.com" },
  { name: "Emily Miller", email: "emily.miller@email.com" },
  { name: "Daniel Wilson", email: "daniel.wilson@email.com" },
  { name: "Nancy Moore", email: "nancy.moore@email.com" },
];
const walletTypes: ("SPENDING" | "SAVINGS" | "CASH" | "CREDIT")[] = [
  "SPENDING",
  "SAVINGS",
  "CASH",
  "CREDIT",
];

function getRandomItem<T>(values: T[]) {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

async function createTransactionCategoryTypes() {
  for (const category of transactionCategories) {
    await prisma.transactionCategoryType.create({ data: category });
  }
}

async function createTransactionCategories() {
  for (const [category, types] of Object.entries(transactionCategoryTypes)) {
    const transactionCategoryType =
      await prisma.transactionCategoryType.findFirst({
        where: { name: category },
      });

    if (!transactionCategoryType) {
      console.error(
        `Transaction category type with name "${category}" not found`
      );
      return;
    }

    for (const type of types) {
      await prisma.transactionCategory.create({
        data: {
          ...type,
          transactionCategoryTypeId: transactionCategoryType.id,
        },
      });
    }
  }
}

async function createTransactionPerWallet(walletId: string) {
  await prisma.transaction.create({ data: { walletId } });
}

async function createWalletPerUser(userId: string) {
  return prisma.wallet.create({
    data: {
      userId,
      type: getRandomItem<"SPENDING" | "SAVINGS" | "CASH" | "CREDIT">(
        walletTypes
      ),
      balance: 0,
    },
  });
}

async function createUsers() {
  for (const user of users) {
    const created = await prisma.user.create({ data: user });
    const wallet = await createWalletPerUser(created.id);
    createTransactionPerWallet(wallet.id);
  }
}

// await createTransactionCategoryTypes();
// await createTransactionCategories();
// await createUsers();

await prisma.$disconnect();
