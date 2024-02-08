import { FC } from "react";
import { useGetFeaturedBlogsQuery } from "../../services/blogApi";
import FeaturedBlogList from "./FeaturedBlogList";

const Hero: FC = () => {
  const { data, isLoading, isError } = useGetFeaturedBlogsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const blogs = data?.blogs;

  if (!blogs || (blogs && blogs.length === 0)) {
    return <p>No blogs found</p>;
  }

  return (
    <div className="bg-black h-1/2 text-white text-center pb-7">
      <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] mb-2">
        Lifestyle Blog
      </h1>
      <FeaturedBlogList blogs={blogs} />
    </div>
  );
};
export default Hero;
