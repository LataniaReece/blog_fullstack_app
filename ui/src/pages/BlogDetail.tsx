import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";

import { useGetBlogByIdQuery } from "../services/blogApi";
import PageLoader from "../components/PageLoader";

const BlogDetail = () => {
  const { id: blogId } = useParams();
  const { data, isLoading, isError } = useGetBlogByIdQuery({ id: `${blogId}` });

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (isLoading) {
    return <PageLoader text="Loading blog..." />;
  }

  if (!data || !data.blog || isError) {
    return <p>Error loading the blog.</p>;
  }

  const blog = data.blog;

  const sanitizeHTML = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px] overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="container mx-auto my-7 px-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-gray-500">
                {format(blog.updatedAt, "MMMM dd, yyyy")}
              </p>
              <div className="flex gap-2">
                {blog.categories.split(",").map((category) => (
                  <p className="text-gray-500 font-light text-xs uppercase mt-2 underline">
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <Link
              to="/"
              className="bg-transparent hover:bg-black text-black text-xs lg:text-sm font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded"
            >
              Go back
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-2 rounded">{blog.title}</h2>
        </div>

        <div className="py-2 rounded">
          <p dangerouslySetInnerHTML={sanitizeHTML(blog.content)} />
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
