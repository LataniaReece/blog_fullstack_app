import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import BlogList from "../components/blogs/BlogList";
import { useGetUserBlogsQuery } from "../services/blogApi";
import Container from "../components/Container";

const MyAccount = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useSelector((state: RootState) => state.user);
  const { data, isLoading, isFetching, isError } = useGetUserBlogsQuery({
    id,
    page,
    limit: 12,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [id, navigate]);

  return (
    <Container>
      <div className="mt-10">
        <div className="flex flex-col items-start justify-between mb-4 md:flex-row md:items-center">
          <p
            className="text-2xl font-semibold"
            data-testid="account-page-heading"
          >
            Your Blogs:
          </p>
          <Link
            to="/blogs/new"
            className="bg-black hover:bg-custom-blue text-white text-xs lg:text-sm font-semibold p-2 border border-black hover:border-transparent rounded"
          >
            Add New +
          </Link>
        </div>
        <BlogList
          data={data}
          isFetching={isFetching}
          isLoading={isLoading}
          isError={isError}
          page={page}
          setPage={setPage}
        />
      </div>
    </Container>
  );
};
export default MyAccount;
