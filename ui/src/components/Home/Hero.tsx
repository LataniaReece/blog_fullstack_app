import { FC } from "react";
import { useGetFeaturedBlogsQuery } from "../../services/blogApi";
import FeaturedBlogs from "./FeaturedBlogs";

const Hero: FC = () => {
  const { data, isLoading, isError } = useGetFeaturedBlogsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const blogs = data?.blogs;
  return (
    <>
      {blogs && blogs.length > 0 ? (
        <FeaturedBlogs blogs={blogs} />
      ) : (
        <p>No blogs found</p>
      )}
    </>
  );
};
export default Hero;
