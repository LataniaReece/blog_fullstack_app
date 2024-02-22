import { FC } from "react";
import { FaSpinner } from "react-icons/fa";

interface DataLoaderProps {
  text: string;
}
const DataLoader: FC<DataLoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center mt-20">
      <div className="text-center">
        <div role="status">
          <FaSpinner className="w-full h-full" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <p className="text-xl">{text}</p>
    </div>
  );
};
export default DataLoader;
