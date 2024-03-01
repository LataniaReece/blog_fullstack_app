import { FC } from "react";
import { IoIosNavigate } from "react-icons/io";
import { Link } from "react-router-dom";

interface PageErrorProps {
  heading: string;
  subHeading: string;
}

const PageError: FC<PageErrorProps> = ({ heading, subHeading }) => {
  return (
    <div className="bg-not-found h-[100vh] bg-cover bg-center text-white text-center">
      <div className="flex flex-col items-center h-full gap-4 pt-32">
        <p className="text-8xl md:text-9xl font-semibold">{heading}</p>
        <p className="text-xl md:text-2xl shadow">{subHeading}</p>
        <Link
          to="/"
          className="flex flex-col items-center hover:underline mt-20"
        >
          <IoIosNavigate size={40} className="text-gray-300" />
          <span className="text-gray-300">Go back to homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default PageError;
