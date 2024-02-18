import { FC, useState } from "react";
import Hero from "../components/Home/Hero";
import BlogList from "../components/blogs/BlogList";
import { useGetBlogsQuery } from "../services/blogApi";

const Home: FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetBlogsQuery({
    page,
    limit: 4,
  });

  return (
    <>
      <Hero />
      <BlogList
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        setPage={setPage}
      />
    </>
  );
};
export default Home;
