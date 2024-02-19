import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { IoMdClose } from "react-icons/io";

const contextClass = {
  success: "bg-emerald-600",
  error: "bg-rose-700",
  default: "bg-gray-600",
};

// Styling Docs: https://fkhadra.github.io/react-toastify/how-to-style
const CustomToastContainer: FC = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toastClassName={({ type }: any) => {
        const className =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (contextClass as any)[type || "default"] || contextClass["default"];
        return `${className} relative flex p-1 min-h-10 rounded-md justify-between items-center overflow-hidden cursor-pointer`;
      }}
      closeButton={({ closeToast }) => (
        <button className="text-white" onClick={closeToast}>
          <IoMdClose />
        </button>
      )}
    />
  );
};

export default CustomToastContainer;
