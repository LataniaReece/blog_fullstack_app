import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import BlogList from "../components/blogs/BlogList";
import { useGetUserBlogsQuery } from "../services/blogApi";

const MyAccount = () => {
  const [page, setPage] = useState<number>(1);
  const { id, username } = useSelector((state: RootState) => state.user);
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
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between">
        <p className="text-3xl capitalize mb-3">{`Hey, ${username}!`}</p>
        <Link
          to="/blogs/new"
          className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
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
        isHomePage={false}
      />
    </div>
  );
};
export default MyAccount;
