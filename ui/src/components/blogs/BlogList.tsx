import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CiWarning } from "react-icons/ci";
import isEqual from "lodash/isEqual";

import { BlogsResponse } from "../../services/blogApi";
import { Blog } from "../../types/blogTypes";
import PageLoader from "../PageLoader";
import Spinner from "../Spinner";

interface BlogListProps {
  data: BlogsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const BlogList: FC<BlogListProps> = ({
  data,
  isLoading,
  isError,
  isFetching,
  page,
  setPage,
}) => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const lastBlogsRef = useRef<Blog[]>([]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data?.blogs && !isEqual(data.blogs, lastBlogsRef.current)) {
      if (page === 1) {
        setAllBlogs(data.blogs);
      } else {
        setAllBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
      }
      lastBlogsRef.current = data.blogs;
    }
  }, [data?.blogs, page]);

  useEffect(() => {
    return () => {
      setAllBlogs([]);
      lastBlogsRef.current = [];
    };
  }, []);

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

  if (!isLoading && !isError && !isFetching && data?.blogs?.length === 0) {
    return (
      <div className="flex flex-col items-center py-5">
        <CiWarning size={40} />
        <p className="text-2xl">No blogs found</p>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
  };

  return (
    <InfiniteScroll
      dataLength={allBlogs.length}
      next={fetchNextPage}
      hasMore={data?.hasNextPage || false}
      loader={<Spinner />}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-8 pb-10">
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
