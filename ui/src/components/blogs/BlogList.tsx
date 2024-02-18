import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { BlogsResponse } from "../../services/blogApi";
import { Blog } from "../../types/blogTypes";

interface BlogListProps {
  data: BlogsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const BlogList: FC<BlogListProps> = ({
  data,
  isLoading,
  isError,
  isFetching,
  setPage,
}) => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [blogIds, setBlogIds] = useState<Set<number | string>>(new Set());

  const hasNextPage = data?.hasNextPage;

  useEffect(() => {
    if (data?.blogs && data.blogs.length > 0) {
      const uniqueNewBlogs = data.blogs.filter((blog) => !blogIds.has(blog.id));
      const updatedBlogs = [...allBlogs, ...uniqueNewBlogs];
      const updatedBlogIds = new Set([
        ...blogIds,
        ...uniqueNewBlogs.map((blog) => blog.id),
      ]);

      setAllBlogs(updatedBlogs);
      setBlogIds(updatedBlogIds);
    }
  }, [data?.blogs]);

  const isScrollingNearBottom = () => {
    return (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    );
  };

  const loadMoreBlogs = () => {
    if (isScrollingNearBottom() && !isFetching && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // This pattern might seem to introduce unnecessary removal and re-addition of event listeners, which could be a concern for performance.
  // However, in practice, the performance impact is negligible for most applications. The real benefit is ensuring correctness and preventing bugs related to stale closures and state.
  //In summary, including isFetching and hasNextPage as dependencies in the useEffect for adding the scroll event listener ensures that your loadMoreBlogs function always acts on the most current state.
  useEffect(() => {
    window.addEventListener("scroll", loadMoreBlogs);
    return () => window.removeEventListener("scroll", loadMoreBlogs);
  }, [isFetching, hasNextPage]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl">Loading Blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl">Error fetching blogs. Please try again.</p>
      </div>
    );
  }

  if (!allBlogs.length) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl">No blogs found</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-8 py-10 px-4">
        {allBlogs.map((blog) => (
          <motion.div
            className="md:max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full hover:scale-105 hover:cursor-pointer hover:underline transition-transform duration-200" // ensure the card itself has a full height
            key={blog.id}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Link to={`/blogs/${blog.id}`} className="flex flex-col h-full">
              <img
                className="w-full"
                src={blog.imageUrl || "https://via.placeholder.com/200"}
                alt={blog.title}
              />
              <div className="px-3 md:px-6 py-4 flex-grow">
                <div className="font-bold  md:text-xl md:mb-2">
                  {blog.title}
                </div>
              </div>
              <div className="px-3 md:px-6 pt-4 pb-5 flex-shrink-0">
                <button className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-1 px-3 border border-black hover:border-transparent rounded-full">
                  See Blog
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {isFetching && (
        <div role="status" className="flex justify-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!hasNextPage && (
        <div className="flex justify-end mb-3 mr-4">
          <button
            className="bg-black hover:bg-gray-700 text-white  py-2 px-4 rounded"
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            Top of page
          </button>
        </div>
      )}
    </>
  );
};
export default BlogList;
