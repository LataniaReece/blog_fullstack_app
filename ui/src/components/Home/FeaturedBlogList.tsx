import { FC } from "react";
import { Blog } from "../../types/blogTypes";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface FeaturedBlogListProps {
  blogs: Blog[];
}

const FeaturedBlogList: FC<FeaturedBlogListProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return null;

  const mainBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="px-4 sm:px-10 flex flex-col lg:flex-row lg:gap-6 text-left ">
      {/* Main Blog */}
      <Link
        to={`/blogs/${mainBlog.id}`}
        className="w-full flex-1 mb-6 lg:pr-4 relative "
      >
        <img
          src={mainBlog.imageUrl}
          alt={mainBlog.title}
          className="w-500 object-cover rounded-lg"
        />
        <div className="mt-4">
          <p className="text-gray-500">
            {format(mainBlog.updatedAt, "MMMM dd, yyyy")}
          </p>
          <h2 className="text-2xl font-bold my-2 rounded">{mainBlog.title}</h2>
          <div className="py-2 rounded">
            <p className="line-clamp-5 text-gray-500">{mainBlog.content}</p>
          </div>
        </div>
      </Link>

      {/* Other Blogs */}
      <div className="w-full flex-1 flex flex-col gap-6 lg:gap-0 justify-between">
        {otherBlogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            key={blog.id}
            className="flex flex-row items-center gap-4"
          >
            <div className="basis-2/5 order-2 lg:order-1">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover rounded-lg"
                // className="w-full h-full object-cover rounded-lg transition-opacity duration-500 ease-in opacity-0"
                // onLoad={(e) =>
                //   e.currentTarget.classList.replace("opacity-0", "opacity-100")
                // }
              />
            </div>
            <div className="basis-3/5 order-1 lg:order-2">
              <p className="text-xs md:text-base text-gray-500">
                {format(blog.updatedAt, "MMMM dd, yyyy")}
              </p>
              <h3 className="text-sm md:text-xl font-semibold mb-2 py-2 rounded">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogList;
