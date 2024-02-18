import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { BlogsResponse } from "../../services/blogApi";
import { Blog } from "../../types/blogTypes";
import PageLoader from "../PageLoader";
import Spinner from "../Spinner";

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

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

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

  if (isLoading) {
    return <PageLoader text="Loading Blogs..." />;
  }

  if (isError) {
    return (
      <div className="flex justify-center">
        <p className="text-3xl">Error fetching blogs. Please try again.</p>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <InfiniteScroll
      dataLength={allBlogs.length}
      next={fetchNextPage}
      hasMore={data?.hasNextPage || false}
      loader={<Spinner />}
      endMessage={
        allBlogs.length &&
        !isFetching &&
        !data?.hasNextPage && (
          <p className="text-center mb-2 text-gray-400 font-light">
            End of blogs
          </p>
        )
      }
    >
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
    </InfiniteScroll>
  );
};
export default BlogList;
