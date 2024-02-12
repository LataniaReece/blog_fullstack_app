import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { useGetFeaturedBlogsQuery } from "../../services/blogApi";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";

const Hero: FC = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const { data, isLoading, isError } = useGetFeaturedBlogsQuery();

  const blogs = data?.blogs;

  useEffect(() => {
    // Check if the number of loaded images matches the number of blogs
    const allLoadedCheck =
      Object.keys(loadedImages).length === blogs?.length &&
      Object.values(loadedImages).every((status) => status === true);
    setAllImagesLoaded(allLoadedCheck);
  }, [loadedImages, blogs?.length]);

  const handleImageLoaded = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const sanitizeHTML = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: "easeInOut",
      },
    },
  };

  if (isLoading) {
    return (
      <HeroWrapper>
        <div className="flex justify-center">
          <p className="text-3xl">Loading Blogs...</p>
        </div>
      </HeroWrapper>
    );
  }

  if (isError) {
    return (
      <HeroWrapper>
        <div className="flex justify-center">
          <p className="text-3xl">Error fetching blogs. Please try again.</p>
        </div>
      </HeroWrapper>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <HeroWrapper>
        <div className="flex justify-center">
          <p className="text-3xl">No blogs found</p>
        </div>
      </HeroWrapper>
    );
  }

  const mainBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <HeroWrapper>
      <>
        {!allImagesLoaded && (
          <div className="flex justify-center">
            <p className="text-3xl">Loading Blogs...</p>
          </div>
        )}
        <div className="px-4 sm:px-10 text-left">
          <motion.div
            className="flex flex-col lg:flex-row lg:gap-6 w-full"
            initial="hidden"
            animate={allImagesLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Main Blog */}
            <Link
              to={`/blogs/${mainBlog.id}`}
              className="w-full flex-1 mb-6 lg:pr-4 relative"
            >
              <img
                src={mainBlog.imageUrl}
                alt={mainBlog.title}
                className="w-500 object-cover rounded-lg"
                onLoad={() => handleImageLoaded(mainBlog.id)}
              />
              <div>
                <p className="text-gray-500 mt-3">
                  {format(mainBlog.updatedAt, "MMMM dd, yyyy")}
                </p>
                <h2 className="text-2xl font-bold my-2 rounded">
                  {mainBlog.title}
                </h2>
                <div className="py-2 rounded">
                  <p
                    className="line-clamp-5 text-gray-500"
                    dangerouslySetInnerHTML={sanitizeHTML(mainBlog.content)}
                  />
                </div>
              </div>
            </Link>

            {/* Other Blogs */}
            <div className="w-full flex-1 flex flex-col gap-6 lg:gap-0 justify-between">
              {otherBlogs.map((blog) => (
                <Fragment key={blog.id}>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="flex flex-row items-center gap-4"
                  >
                    <div className="basis-2/5 order-2 lg:order-1">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-lg"
                        onLoad={() => handleImageLoaded(blog.id)}
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
                </Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </>
    </HeroWrapper>
  );
};
export default Hero;

interface HeroWrapperProps {
  children: ReactNode;
}

const HeroWrapper: FC<HeroWrapperProps> = ({ children }) => (
  <div className="bg-black h-1/2 text-white text-center pb-7 min-h-[750px]">
    <div className="container mx-auto">
      <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] mb-2">
        Lifestyle Blog
      </h1>
      {children}
    </div>
  </div>
);