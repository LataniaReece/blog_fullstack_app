import prisma from "./db";

async function truncateTables() {
  const tables = ["User", "Blog"];
  await Promise.all(
    tables.map((table) =>
      prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
      )
    )
  );
}

export default truncateTables;
