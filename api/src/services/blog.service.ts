import prisma from "../utils/db";

interface BlogInput {
  title: string;
  content: string;
  categories: string[];
  authorId: string;
}

interface UpdateBlogInput extends BlogInput {
  id: string;
}

export const getBlogs = async () => {
  console.log("helo");
  const blogs = await prisma.blog.findMany();
  return { blogs };
};

export const getUserBlogs = async (userId: string) => {
  const blogs = await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
  });
  return { blogs };
};

export const getBlogById = async (id: string) => {
  return await prisma.blog.findUnique({
    where: { id },
  });
};

export const createBlog = async ({
  title,
  content,
  categories,
  authorId,
}: BlogInput) => {
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      categories,
      author: {
        connect: { id: authorId },
      },
    },
  });

  return { blog };
};

export const updateBlog = async ({
  id,
  title,
  content,
  categories,
}: UpdateBlogInput) => {
  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      content,
      categories,
    },
  });

  return { blog };
};

export const deleteBlog = async (id: string) => {
  const blog = await prisma.blog.delete({
    where: { id },
  });

  return { blog };
};
