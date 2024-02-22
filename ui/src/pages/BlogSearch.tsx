import { useState, useEffect, FC, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { BiSolidCategory } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import BlogList from "../components/blogs/BlogList";
import Dropdown from "../components/blogs/Dropdown";
import {
  useGetBlogsQuery,
  useGetUsersWithBlogsQuery,
} from "../services/blogApi";
import { categories } from "../utils/constants";
import Container from "../components/Container";

const BlogSearch: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [keywordInputValue, setKeywordInputValue] = useState("");

  const getInitialSearchParams = () => {
    if (location.state) {
      const { category, authorName } = location.state as {
        category?: string;
        authorName?: string;
      };
      return {
        category: category || "",
        authorName: authorName || "",
        keyword: "",
      };
    }
    return { category: "", authorName: "", keyword: "" };
  };

  const [searchParamsQuery, setSearchParamsQuery] = useState(
    getInitialSearchParams
  );

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

  const isCurrentSearch =
    searchParamsQuery.authorName ||
    searchParamsQuery.category ||
    searchParamsQuery.keyword;

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

  // useEffect to clear location state after using it, to prevent it from affecting future renders
  useEffect(() => {
    if (location.state) {
      navigate(location.pathname, { replace: true });
    }
  }, [navigate, location.pathname, location.state]);

  const handleCategoryClick = useCallback((category: string) => {
    setSearchParamsQuery((prev) => ({
      ...prev,
      category,
      authorName: "",
      keyword: "",
    }));
    setKeywordInputValue("");
  }, []);

  const handleSelectUser = useCallback((user: string) => {
    setSearchParamsQuery((prev) => ({
      ...prev,
      category: "",
      authorName: user,
      keyword: "",
    }));
    setKeywordInputValue("");
  }, []);

  const clearFilters = () => {
    setSearchParamsQuery({
      category: "",
      authorName: "",
      keyword: "",
    });
    setKeywordInputValue("");
  };

  const users = usersData?.users.map((user) => user.username);
  const totalBlogs = data?.totalBlogs;

  return (
    <Container>
      <div className="my-10">
        {/* Filters Start */}
        <div className="flex flex-col justify-start md:flex-row md:items-center md:justify-between">
          <div className="w-full flex flex-col items-center gap-4 md:flex-row md:w-auto">
            <form className="w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoIosSearch />
                </div>
                <input
                  type="search"
                  id="search"
                  className="w-full md:w-auto block px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50  focus:border-blue-300 focus:outline-none"
                  placeholder="Search Blogs"
                  value={keywordInputValue}
                  onChange={(e) => setKeywordInputValue(e.target.value)}
                />
              </div>
            </form>
            <Dropdown
              items={categories}
              selectedItem={searchParamsQuery.category}
              handleSelectItem={handleCategoryClick}
              placeholder="Categories"
              Icon={<BiSolidCategory />}
            />
            {users && (
              <Dropdown
                items={users}
                selectedItem={searchParamsQuery.authorName}
                handleSelectItem={handleSelectUser}
                placeholder="Users"
                Icon={<FaUser />}
              />
            )}
          </div>
          {isCurrentSearch && (
            <button
              type="button"
              onClick={clearFilters}
              className="underline cursor-pointer hover:no-underline hover:text-slate-500 mt-2 md:mt-0"
            >
              Clear Filters
            </button>
          )}
        </div>
        {/* Filters End*/}
        {isCurrentSearch && (
          <>
            <h1 className="text-2xl mt-5 font-semibold">
              {totalBlogs}
              <span className="font-light text-gray-500">
                &nbsp;Result{totalBlogs == 1 ? "" : "s"} Found:&nbsp;
              </span>
            </h1>
            <p className="capitalize font-light text-gray-500 text-sm">
              <span className="text-black font-semibold">for</span>&nbsp;
              {searchParamsQuery.authorName ||
                searchParamsQuery.category ||
                searchParamsQuery.keyword}
            </p>
          </>
        )}
        <div className="mt-5">
          <BlogList
            data={data}
            isLoading={isLoading || usersIsLoading}
            isFetching={isFetching}
            isError={isError || usersIsError}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </Container>
  );
};

export default BlogSearch;
