import prisma from "../utils/db";

interface BlogInput {
  title: string;
  content: string;
  categories: string[];
  authorId: string;
  imageUrl: string | null;
}

interface UpdateBlogInput extends BlogInput {
  id: string;
}

export const getBlogs = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit; // Calculate the starting point

  const blogs = await prisma.blog.findMany({
    skip,
    take: limit,
  });

  const totalBlogs = await prisma.blog.count();
  const totalPages = Math.ceil(totalBlogs / limit);
  const hasNextPage = page < totalPages;

  return { blogs, totalBlogs, totalPages, hasNextPage };
};

export const getFeaturedBlogs = async () => {
  const blogs = await prisma.blog.findMany({ where: { featured: true } });
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
  imageUrl,
}: BlogInput) => {
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      categories,
      imageUrl,
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
  imageUrl,
}: UpdateBlogInput) => {
  const blog = await prisma.blog.update({
    where: { id },
    data: {
      title,
      content,
      categories,
      imageUrl,
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
