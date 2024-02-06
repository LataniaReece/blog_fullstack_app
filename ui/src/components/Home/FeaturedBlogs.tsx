import { FC } from "react";
import { Blog } from "../../types/blogTypes";

interface FeaturedBlogsProps {
  blogs: Blog[];
}

const FeaturedBlogs: FC<FeaturedBlogsProps> = ({ blogs }) => {
  return blogs.map((blog) => <p>{blog.title}</p>);
};
export default FeaturedBlogs;
