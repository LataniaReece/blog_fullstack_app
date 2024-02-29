import { FC } from "react";
import { IoIosNavigate } from "react-icons/io";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="bg-not-found h-[100vh] bg-cover bg-center text-white text-center">
      <div className="flex flex-col items-center h-full gap-4 pt-32">
        <p className="text-8xl md:text-9xl font-semibold">404</p>
        <p className="text-xl md:text-2xl shadow">
          It seems you got a bit lost
        </p>
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
export default NotFound;
