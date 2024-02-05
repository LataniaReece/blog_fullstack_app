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
    featured: true,
  },
  {
    title: "5 Essential Tips for Healthy Eating",
    content:
      "Healthy eating is not about strict dietary limitations, staying unrealistically thin, or depriving yourself of the foods you love. Here are five essential tips to make every meal healthier...",
    categories: ["Health", "Food", "Lifestyle"],
    featured: false,
  },
  {
    title: "Mastering the Art of Mindful Living",
    content:
      "Mindfulness is more than a practice; it's a way of living. Discover how to integrate mindfulness into your daily routine to live a more focused, calm, and fulfilling life.",
    categories: ["Wellness", "Mindfulness", "Lifestyle"],
    featured: true,
  },
  {
    title: "Sustainable Fashion: A Guide to Eco-Friendly Choices",
    content:
      "Sustainable fashion isn't a trend—it's a movement towards ethical, eco-friendly fashion choices. Learn how you can make a difference with your wardrobe.",
    categories: ["Fashion", "Sustainability", "Lifestyle"],
    featured: false,
  },
  {
    title: "DIY Home Projects for a Cozy Weekend",
    content:
      "Looking for a productive weekend? Dive into these DIY home projects that not only uplift your living space but also provide a satisfying sense of accomplishment.",
    categories: ["DIY", "Home Improvement", "Lifestyle"],
    featured: false,
  },
  {
    title: "The Beginner's Guide to Meditation",
    content:
      "Meditation can seem intimidating at first, but it's a highly accessible practice. Here's a beginner's guide to finding inner peace and clarity through meditation.",
    categories: ["Wellness", "Meditation", "Lifestyle"],
    featured: true,
  },
  {
    title: "Exploring the World Through Culinary Arts",
    content:
      "Culinary arts offer a unique lens to explore cultures and traditions. Join us as we embark on a gastronomic journey to uncover the flavors of the world.",
    categories: ["Food", "Culture", "Lifestyle"],
    featured: false,
  },
  {
    title: "Eco-Friendly Living: Simple Steps to Reduce Your Carbon Footprint",
    content:
      "Eco-friendly living goes beyond recycling. Discover simple, impactful ways to reduce your carbon footprint and live a more sustainable life.",
    categories: ["Sustainability", "Eco-Friendly", "Lifestyle"],
    featured: false,
  },
  {
    title: "Fitness at Home: Building Your Personal Gym on a Budget",
    content:
      "You don't need expensive equipment to stay fit. Explore how to build an effective home gym that fits your budget and fitness goals.",
    categories: ["Health", "Fitness", "Lifestyle"],
    featured: true,
  },
  {
    title: "Gardening for Beginners: Cultivating Your Own Green Space",
    content:
      "Gardening can be a therapeutic hobby and a sustainable way to grow your own food. Learn the basics to start your own garden, no matter the size of your space.",
    categories: ["Gardening", "Sustainability", "Lifestyle"],
    featured: false,
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
      const { title, content, featured, categories } = blog;
      await prisma.blog.create({
        data: {
          title,
          content,
          featured,
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
