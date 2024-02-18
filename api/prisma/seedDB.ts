import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { blogData } from "./seedBlogData";

const prisma = new PrismaClient();

const userData1 = {
  username: "tania",
  password: "123456", // This will be hashed before storage
};

const userData2 = {
  username: "cal",
  password: "123456", // This will be hashed before storage
};

async function main() {
  try {
    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash(userData1.password, saltRounds);
    const hashedPassword2 = await bcrypt.hash(userData2.password, saltRounds);

    // Create or find the user with the hashed password
    const user1 = await prisma.user.create({
      data: {
        username: userData1.username,
        password: hashedPassword1,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: userData2.username,
        password: hashedPassword2,
      },
    });

    // Iterate over blog data to create blogs associated with the user
    for (let i = 0; i < blogData.length; i++) {
      const blog = blogData[i];
      const { title, content, featured, categories, imageUrl } = blog;
      const authorId = i < 5 ? user1.id : user2.id; // Use user1.id for the first 5 items, user2.id for the last 5

      await prisma.blog.create({
        data: {
          title,
          content,
          featured,
          categories,
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId, // This will be either user1.id or user2.id based on the index
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
