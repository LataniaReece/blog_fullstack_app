import { useGetBlogsQuery } from "../services/blogApi";

const Home = () => {
  const { data, isLoading } = useGetBlogsQuery();

  const blogsData = data?.blogs;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    blogsData &&
    blogsData.map((blog) => {
      return (
        <div>
          <p>{blog.title}</p>
        </div>
      );
    })
  );
};
export default Home;
