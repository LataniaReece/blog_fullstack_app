import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData = {
  username: "newUser",
  password: "123456", // This will be hashed before storage
};

const blogData = [
  {
    title: "The Art of Minimalism in Home Decor",
    content:
      "Minimalism isn’t just a design philosophy; it’s a way of life. In this blog, we explore how minimalism can transform your living space and mind...",
    categories: ["Home Decor", "Minimalism", "Lifestyle"],
  },
  {
    title: "5 Essential Tips for Healthy Eating",
    content:
      "Healthy eating is not about strict dietary limitations, staying unrealistically thin, or depriving yourself of the foods you love. Here are five essential tips to make every meal healthier...",
    categories: ["Health", "Food", "Lifestyle"],
  },
  {
    title: "Mastering the Art of Mindful Living",
    content:
      "Mindfulness is more than a practice; it's a way of living. Discover how to integrate mindfulness into your daily routine to live a more focused, calm, and fulfilling life.",
    categories: ["Wellness", "Mindfulness", "Lifestyle"],
  },
  {
    title: "Sustainable Fashion: A Guide to Eco-Friendly Choices",
    content:
      "Sustainable fashion isn't a trend—it's a movement towards ethical, eco-friendly fashion choices. Learn how you can make a difference with your wardrobe.",
    categories: ["Fashion", "Sustainability", "Lifestyle"],
  },
  {
    title: "DIY Home Projects for a Cozy Weekend",
    content:
      "Looking for a productive weekend? Dive into these DIY home projects that not only uplift your living space but also provide a satisfying sense of accomplishment.",
    categories: ["DIY", "Home Improvement", "Lifestyle"],
  },
  {
    title: "The Beginner's Guide to Meditation",
    content:
      "Meditation can seem intimidating at first, but it's a highly accessible practice. Here's a beginner's guide to finding inner peace and clarity through meditation.",
    categories: ["Wellness", "Meditation", "Lifestyle"],
  },
  {
    title: "Exploring the World Through Culinary Arts",
    content:
      "Culinary arts offer a unique lens to explore cultures and traditions. Join us as we embark on a gastronomic journey to uncover the flavors of the world.",
    categories: ["Food", "Culture", "Lifestyle"],
  },
];

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
      const { title, content, categories } = blog;
      await prisma.blog.create({
        data: {
          title,
          content,
          categories: { set: categories },
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
