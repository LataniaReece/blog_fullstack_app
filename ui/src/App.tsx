import { useGetBlogsQuery } from "./services/blogApi";

function App() {
  const { isLoading, data } = useGetBlogsQuery();

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
}

export default App;
