import { useParams } from "react-router-dom";
import { format } from "date-fns";
import DOMPurify from "dompurify";

import { useGetBlogByIdQuery } from "../services/blogApi";

const BlogDetail = () => {
  const { id: blogId } = useParams();
  const { data, isLoading, isError } = useGetBlogByIdQuery({ id: `${blogId}` });

  if (isLoading) {
    return <p>Loading Blog...</p>;
  }

  if (!data || !data.blog || isError) {
    return <p>Error loading the blog.</p>;
  }

  const blog = data.blog;

  const sanitizeHTML = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <p className="text-gray-500">
          {format(blog.updatedAt, "MMMM dd, yyyy")}
        </p>
        <h2 className="text-2xl font-bold my-2 rounded">{blog.title}</h2>
      </div>
      <div className="h-[50vh] max-h-[500px] w-full flex justify-start">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="object-contain rounded-lg"
        />
      </div>
      <div className="py-2 rounded">
        <p dangerouslySetInnerHTML={sanitizeHTML(blog.content)} />
      </div>
    </div>
  );
};

export default BlogDetail;
