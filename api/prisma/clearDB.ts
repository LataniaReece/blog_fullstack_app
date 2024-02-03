import { PrismaClient } from "@prisma/client";
import readline from "readline";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Delete all entries from tables, respecting foreign key constraints.
  // Start with the Blog table, as it has a foreign key reference to the User table.
  await prisma.blog.deleteMany({});
  console.log("Deleted all blogs.");

  // Then, delete all entries from the User table.
  await prisma.user.deleteMany({});
  console.log("Deleted all users.");

  console.log("Database cleared successfully.");
}

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) =>
    rl.question(query, (ans: string) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function main() {
  try {
    const answer = await askQuestion(
      "Are you sure you want to clear the database? (yes/no) "
    );
    if (answer.toLowerCase() === "yes") {
      await clearDatabase();
    } else {
      console.log("Operation cancelled.");
      return;
    }
  } catch (e) {
    console.error("Error clearing the database:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
