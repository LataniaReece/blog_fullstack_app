import { useState, useEffect, FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import classNames from "classnames";

import BlogList from "../components/blogs/BlogList";
import UsersDropdown from "../components/blogs/UsersDropdown";
import {
  useGetBlogsQuery,
  useGetUsersWithBlogsQuery,
} from "../services/blogApi";
import { categories } from "../utils/constants";

const BlogSearch: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [keywordInputValue, setKeywordInputValue] = useState("");

  // Initialize searchParamsQuery with empty values or values passed through location state
  const [searchParamsQuery, setSearchParamsQuery] = useState({
    category: "",
    authorName: "",
    keyword: "",
  });

  const { data, isLoading, isError, isFetching } = useGetBlogsQuery({
    page,
    limit: 12,
    ...searchParamsQuery,
  });

  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
  } = useGetUsersWithBlogsQuery();

  const debouncedUpdate = useMemo(
    () =>
      debounce((newKeyword) => {
        setSearchParamsQuery((prev) => ({
          ...prev,
          keyword: newKeyword,
          category: "",
          authorName: "",
        }));
      }, 500),
    []
  );

  useEffect(() => {
    if (keywordInputValue) {
      debouncedUpdate(keywordInputValue);
    } else {
      setSearchParamsQuery((prev) => ({
        ...prev,
        keyword: "",
      }));
    }
    return () => debouncedUpdate.cancel();
  }, [keywordInputValue, debouncedUpdate]);

  // Effect to initialize and clear search parameters
  useEffect(() => {
    if (location.state) {
      const { category, authorName } = location.state as {
        category?: string;
        authorName?: string;
      };
      setSearchParamsQuery({
        category: category || "",
        authorName: authorName || "",
        keyword: "",
      });

      // Clear the state after setting the search parameters
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const handleCategoryClick = (category: string) => {
    setSearchParamsQuery((prev) => ({
      ...prev,
      category,
      authorName: "",
      keyword: "",
    }));
    setKeywordInputValue("");
  };

  const handleSelectUser = (user: string) => {
    setSearchParamsQuery((prev) => ({
      ...prev,
      category: "",
      authorName: user,
      keyword: "",
    }));
    setKeywordInputValue("");
  };

  const users = usersData?.users;

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl mb-2 font-bold">
        Blog Search Results:&nbsp;
        <span className="capitalize italic text-gray-500 font-normal">
          {searchParamsQuery.authorName ||
            searchParamsQuery.category ||
            searchParamsQuery.keyword}
        </span>
      </h1>
      <form className="mt-4">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-blue-300 focus:border-2 focus:outline-none"
            placeholder="Search"
            value={keywordInputValue}
            onChange={(e) => setKeywordInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-3 flex gap-2 items-center">
        <p>Search By Category: </p>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={classNames(" rounded-full text-sm px-3 py-1", {
              "bg-gray-800 text-white hover:bg-gray-600":
                searchParamsQuery.category === category,
              "text-black border border-black hover:bg-gray-600 hover:text-white":
                searchParamsQuery.category !== category,
            })}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <UsersDropdown users={users} handleSelectUser={handleSelectUser} />
      <BlogList
        data={data}
        isLoading={isLoading || usersIsLoading}
        isFetching={isFetching}
        isError={isError || usersIsError}
        page={page}
        setPage={setPage}
        isHomePage={false}
      />
    </div>
  );
};

export default BlogSearch;
