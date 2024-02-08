import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData = {
  username: "tania",
  password: "123456", // This will be hashed before storage
};

const blogData = [
  {
    title: "The Art of Minimalism in Home Decor",
    content:
      "Minimalism isn’t just a design philosophy; it’s a way of life. Adopting a minimalist approach in home decor means focusing on simplicity and functionality. By stripping away the unnecessary, we can create spaces that are efficient, serene, and harmonious. Minimalist homes often make use of monochromatic color schemes, clean lines, and natural materials. The result is a space that feels calm and intentional. Beyond aesthetics, minimalism encourages us to declutter not just our homes, but also our minds, leading to a more contented and focused life.",
    categories: ["Home Decor", "Minimalism", "Lifestyle"],
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707338416/blog_fullstack_app/home-decor_asrlc8.jpg",
  },
  {
    title: "5 Essential Tips for Healthy Eating",
    content:
      "Healthy eating goes beyond the act of consuming food. It's a commitment to nourishing your body with what it truly needs. Our diet plays a pivotal role in our overall well-being, influencing our physical health, mood, and energy levels. By making informed choices, we can reduce the risk of chronic diseases, maintain an ideal weight, and feel more vibrant. It's essential to understand that healthy eating isn't about adhering to strict dietary restrictions. Instead, it's about finding a balance and enjoying a diverse range of foods that provide the nutrients our bodies demand.",
    categories: ["Health", "Food", "Lifestyle"],
    featured: false,
    imageUrl: null,
  },
  {
    title: "Mastering the Art of Mindful Living",
    content:
      "Mindfulness is more than a practice; it's a lifestyle. In our fast-paced world, being present has become an art form. Mindfulness teaches us to anchor ourselves in the present moment, appreciating life as it unfolds. It's a journey of self-discovery, allowing us to understand our thoughts, emotions, and reactions. By embracing mindfulness, we cultivate a sense of inner peace, resilience, and clarity. It's not just about meditation or specific exercises; it's about imbuing every moment of our lives with awareness and intention.",
    categories: ["Wellness", "Mindfulness", "Lifestyle"],
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707338799/blog_fullstack_app/mindful_bqq0wm.jpg",
  },
  {
    title: "Sustainable Fashion: A Guide to Eco-Friendly Choices",
    content:
      "Fashion has always been a reflection of the times, and today, there's a growing emphasis on sustainability. As consumers become more conscious of the environmental impact of their choices, the fashion industry is evolving. Sustainable fashion seeks to marry style with ethics, emphasizing eco-friendly materials, ethical production processes, and longevity. It challenges the fast fashion model, advocating for quality over quantity. By choosing sustainable fashion, we're not just making a style statement; we're also making a statement about the kind of world we want to live in.",
    categories: ["Fashion", "Sustainability", "Lifestyle"],
    featured: false,
    imageUrl: null,
  },
  {
    title: "DIY Home Projects for a Cozy Weekend",
    content:
      "The satisfaction of creating something with your own hands is unparalleled. DIY home projects are not only a great way to save money but also a means to personalize your space. Whether it's upcycling old furniture, creating custom decorations, or even building functional items, the possibilities are endless. Diving into DIY projects can be therapeutic, offering an escape from the daily grind. With a bit of creativity and determination, you can transform your living space into a reflection of your personality and style.",
    categories: ["DIY", "Home Improvement", "Lifestyle"],
    featured: false,
    imageUrl: null,
  },
  {
    title: "The Beginner's Guide to Meditation",
    content:
      "The journey of meditation is a deeply personal one. It's a practice rooted in ancient traditions, offering a sanctuary in our modern world. Meditation is not about turning off thoughts but about observing them without judgment. For beginners, it might seem daunting, but with consistency, it becomes a haven. It's a space where we can connect with ourselves, find clarity, and cultivate inner peace. This guide aims to demystify meditation, offering practical steps to integrate it into daily life and harness its transformative power.",
    categories: ["Wellness", "Meditation", "Lifestyle"],
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707338852/blog_fullstack_app/meditation_miqptk.jpg",
  },
  {
    title: "Exploring the World Through Culinary Arts",
    content:
      "Culinary arts are a window to the world. Every dish tells a story, rooted in culture, tradition, and history. Embarking on a gastronomic journey allows us to explore diverse cuisines and understand the essence of different regions. From the intricate flavors of Asian cuisine to the hearty meals of Eastern Europe, there's a vast world to discover. Beyond just flavors, culinary arts teach us about techniques, ingredients, and the passion that goes into creating memorable dishes. It's an adventure that tantalizes the taste buds and enriches the soul.",
    categories: ["Food", "Culture", "Lifestyle"],
    featured: false,
    imageUrl: null,
  },

  {
    title: "Eco-Friendly Living: Simple Steps to Reduce Your Carbon Footprint",
    content:
      "Eco-friendly living goes beyond recycling. It's a comprehensive approach to life that prioritizes sustainability and conscious decision-making. As concerns about climate change and environmental degradation grow, it's crucial for individuals to take responsibility for their actions. Simple steps, like conserving water, reducing energy consumption, and supporting sustainable businesses, can have a profound impact. By adopting an eco-friendly lifestyle, you're not just reducing your carbon footprint; you're also fostering a better future for the next generation. It's about making choices today that will lead to a greener, healthier tomorrow.",
    categories: ["Sustainability", "Eco-Friendly", "Lifestyle"],
    featured: false,
    imageUrl: null,
  },
  {
    title: "Fitness at Home: Building Your Personal Gym on a Budget",
    content:
      "Staying fit doesn't require a fancy gym membership or high-end equipment. In fact, with a bit of creativity and determination, you can create an effective workout space right at home. Building a home gym on a budget might seem challenging, but it's entirely doable. Start by identifying a dedicated space, whether it's a corner of your living room or a spare bedroom. Next, invest in basic equipment like resistance bands, dumbbells, and a yoga mat. Remember, consistency is key. With the right mindset and a personalized workout routine, you can achieve your fitness goals without breaking the bank.",
    categories: ["Health", "Fitness", "Lifestyle"],
    featured: true,
    imageUrl:
      "https://res.cloudinary.com/ddxxsib3q/image/upload/v1707416863/blog_fullstack_app/home-fitness_cbj0wz.jpg",
  },
  {
    title: "Gardening for Beginners: Cultivating Your Own Green Space",
    content:
      "Gardening is a journey of patience, learning, and connection with nature. For beginners, cultivating a garden might seem daunting, but the rewards are well worth the effort. Whether you have a sprawling backyard or a small balcony, gardening can be adapted to fit your space. Start with understanding your soil and climate, as these are fundamental to plant growth. Choose plants that are suited to your environment, and remember that gardening is a continuous learning process. Over time, as you nurture your plants and watch them thrive, you'll find that gardening is not just about growing plants, but also about cultivating a sense of peace and fulfillment.",
    categories: ["Gardening", "Sustainability", "Lifestyle"],
    featured: false,
    imageUrl: null,
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
      const { title, content, featured, categories, imageUrl } = blog;
      await prisma.blog.create({
        data: {
          title,
          content,
          featured,
          categories: { set: categories },
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
