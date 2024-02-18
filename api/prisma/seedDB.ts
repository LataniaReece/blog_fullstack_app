import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { blogData } from "./seedBlogData";

const prisma = new PrismaClient();

const userData = {
  username: "tania",
  password: "123456", // This will be hashed before storage
};

async function main() {
  try {
    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create or find the user with the hashed password
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
      },
    });

    // Iterate over blog data to create blogs associated with the user
    for (const blog of blogData) {
      const { title, content, featured, categories, imageUrl } = blog;
      await prisma.blog.create({
        data: {
          title,
          content,
          featured,
          categories,
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: user.id,
        },
      });
    }

    console.log("User and blogs seeded successfully.");
  } catch (e) {
    console.error(e);
    process.exit(1); // Exit with a failure code
  } finally {
    await prisma.$disconnect(); // Ensure the database connection is closed when done
  }
}

main();
