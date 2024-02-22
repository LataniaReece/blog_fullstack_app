import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
} from "../services/blogApi";
import PageLoader from "../components/PageLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Spinner from "../components/Spinner";
import Container from "../components/Container";

const BlogDetail = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBlogByIdQuery({ id: `${blogId}` });

  const [
    deleteBlog,
    {
      isLoading: isLoadingDelete,
      isError: isErrorDelete,
      isSuccess: isSuccessDelete,
      error: deleteError,
    },
  ] = useDeleteBlogMutation();

  const { id: userId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("Blog deleted!");
      navigate("/account");
    }
    if (isErrorDelete && deleteError) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (deleteError as any).data?.message || (deleteError as any).message
      );
    }
  }, [isSuccessDelete, navigate, isErrorDelete, deleteError]);

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

  const handleNavigateToSearch = (
    searchType: "category" | "authorName",
    value: string
  ) => {
    navigate("/blogs/search", {
      state: {
        [searchType]: value,
      },
    });
  };

  const handleDelete = () => {
    if (blog?.id) {
      if (window.confirm(`Are you sure you want to delete ${blog?.title}`)) {
        deleteBlog({ id: blog?.id });
      }
    }
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
      <Container>
        <div className="my-7 px-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-gray-500">
                  {format(blog.updatedAt, "MMMM dd, yyyy")}
                </p>
                <div className="flex gap-2">
                  {blog.categories.split(",").map((category) => (
                    <button
                      type="button"
                      key={category}
                      className="text-gray-500 font-light text-xs uppercase mt-2 underline hover:text-gray-400"
                      onClick={() =>
                        handleNavigateToSearch("category", category.trim())
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {userId === blog.author.id && (
                  <Link
                    to={`/blogs/update/${blog.id}`}
                    className="bg-black hover:bg-gray-600 text-white text-xs lg:text-sm font-semibold py-1 px-2 border border-black hover:border-transparent rounded"
                  >
                    Update Blog
                  </Link>
                )}
                {userId === blog.author.id && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-700 hover:bg-red-500 text-white text-xs lg:text-sm font-semibold py-1 px-2 border border-red-700 hover:border-transparent rounded"
                  >
                    {isLoadingDelete ? <Spinner /> : "Delete Blog"}
                  </button>
                )}
                <Link
                  to="/"
                  className="bg-transparent hover:bg-black text-black text-xs lg:text-sm font-semibold hover:text-white py-1 px-2 border border-black hover:border-transparent rounded"
                >
                  Go back
                </Link>
              </div>
            </div>
            <h2 className="text-2xl font-bold rounded">{blog.title}</h2>
            <button
              onClick={() =>
                handleNavigateToSearch(
                  "authorName",
                  blog.author.username.trim()
                )
              }
              className="capitalize font-bold text-gray-600 underline hover:text-gray-400"
            >
              By: {blog.author.username}
            </button>
          </div>

          <div className="py-2 rounded">
            <p dangerouslySetInnerHTML={sanitizeHTML(blog.content)} />
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default BlogDetail;
