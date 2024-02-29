import { CiWarning } from "react-icons/ci";
import { Link } from "react-router-dom";

import Container from "../Container";
import { FC } from "react";

interface BlogNotFoundProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const BlogNotFound: FC<BlogNotFoundProps> = ({ error }) => {
  const isNotFoundError = error?.data?.message === "Blog not found";
  return (
    <Container>
      <div className="flex flex-col items-center mt-20">
        <CiWarning size={40} />
        <p className="text-2xl">
          {isNotFoundError ? "No blog found" : "Error fetching blog"}
        </p>

        <Link
          to="/"
          className="flex flex-col items-center underline hover:no-underline mt-3"
        >
          <span>Go back to homepage</span>
        </Link>
      </div>
    </Container>
  );
};
export default BlogNotFound;
