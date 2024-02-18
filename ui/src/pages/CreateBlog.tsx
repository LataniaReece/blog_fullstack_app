import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import BlogEditor from "../components/blogs/BlogEditor";
import { useCreateBlogMutation } from "../services/blogApi";
import { useNavigate } from "react-router-dom";

const categories: string[] = [
  "Lifestyle",
  "Sustainability",
  "Health",
  "Minimalism",
  "Wellness",
  "Mindfulness",
];

const CreateBlog: FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createBlog, { isSuccess, isError, isLoading, error }] =
    useCreateBlogMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      (prevCategories) =>
        prevCategories.includes(category)
          ? prevCategories.filter((c) => c !== category) // Remove category
          : [...prevCategories, category] // Add category
    );
  };

  const clearFileInput = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !content ||
      selectedCategories.length === 0 ||
      !selectedFile
    ) {
      setMessage("Please enter all fields");
      return;
    }

    // Create a FormData instance to send the file and other data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categories", selectedCategories.join(","));
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }

    try {
      // Use the `createBlog` mutation, sending the FormData
      await createBlog(formData).unwrap();
      // After successful upload, navigate away or clear the form
      navigate("/");
    } catch (err) {
      console.error("Failed to create blog", err);
      // Handle the error state here
      setMessage("Failed to upload the blog");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="container mx-auto my-10">
      <p className="text-3xl font-semibold">Add Blog</p>
      <form className="w-full mt-5" onSubmit={handleSubmit}>
        <div className="my-3">
          <label className="md:mb-0 pr-4 font-semibold mb-1" htmlFor="title">
            Title:
          </label>
          <input
            className=" appearance-non border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-2">
          <p className="mb-1 font-semibold">Categories:</p>
          <div className="flex gap-2">
            {categories &&
              categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={classNames(
                    "border text-sm py-1 px-2 rounded-full",
                    {
                      "bg-black text-white":
                        selectedCategories.includes(category),
                      "bg-transparent text-black hover:bg-black hover:text-white":
                        !selectedCategories.includes(category),
                    }
                  )}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
          </div>
        </div>
        <div className="my-3">
          <label className="md:mb-0 pr-4 font-semibold mb-1" htmlFor="content">
            Content:
          </label>
          <div className="h-[350px]">
            <BlogEditor content={content} setContent={setContent} />
          </div>
        </div>
        <div className="mt-14 mb-3">
          <label htmlFor="file_input" className="block mb-1 font-semibold">
            File Upload:
          </label>
          <div className="flex items-center justify-start bg-white border rounded-lg overflow-hidden">
            <label
              className="px-4 py-2 bg-black text-white cursor-pointer hover:bg-blue-500"
              htmlFor="file_input"
            >
              Choose file
            </label>
            <span className="p-2 text-gray-500 flex-1">
              {(selectedFile && selectedFile.name) || "No File chosen"}
            </span>
            {selectedFile && (
              <button
                onClick={clearFileInput}
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoClose className="text-gray-500" />
              </button>
            )}
            <input
              ref={fileInputRef}
              id="file_input"
              name="file_input"
              type="file"
              className="hidden"
              accept=".svg,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">SVG, PNG, or JPG.</p>
        </div>
        {message && <p>{message}</p>}
        {isError && <p>{(error as Error).message}</p>}
        <div className="flex justify-end ">
          <button
            className="shadow bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {isLoading ? (
              <div role="status" className="flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
