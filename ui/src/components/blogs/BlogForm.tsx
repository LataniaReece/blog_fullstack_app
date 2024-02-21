import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "../../services/blogApi";
import classNames from "classnames";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

import BlogEditor from "./BlogEditor";
import PageLoader from "../../components/PageLoader";
import Spinner from "../Spinner";
import { categories } from "../../utils/constants";

interface BlogFormProps {
  mode: "create" | "update";
}

const BlogForm: FC<BlogFormProps> = ({ mode }) => {
  const { id: blogId } = useParams<{ id: string }>();
  const isUpdateMode = mode === "update";
  const {
    data,
    isLoading: isLoadingFetchBlog,
    isError,
    error,
  } = useGetBlogByIdQuery({ id: `${blogId}` }, { skip: !isUpdateMode });
  const [
    createBlog,
    { isSuccess: isSuccessCreate, isLoading: isLoadingCreateBlog },
  ] = useCreateBlogMutation();
  const [
    updateBlog,
    { isSuccess: isSuccessUpdate, isLoading: isLoadingUpdateBlog },
  ] = useUpdateBlogMutation();

  const blog = isUpdateMode ? data?.blog : null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoadingFormSubmit = isLoadingCreateBlog || isLoadingUpdateBlog;

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setSelectedCategories(blog.categories.split(","));
      setImageUrl(blog.imageUrl);
    }
  }, [blog]);

  useEffect(() => {
    if (isSuccessCreate) {
      toast.success("Blog created!");
      navigate("/account");
    } else if (isSuccessUpdate) {
      toast.success("Blog updated!");
      navigate(`/blogs/${blog?.id}`);
    }
  }, [isSuccessCreate, isSuccessUpdate, navigate, blog]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  if (isLoadingFetchBlog) {
    return <PageLoader text="Loading blog..." />;
  }

  if (isUpdateMode && (!data || !data.blog || isError)) {
    return <p>Error loading the blog.</p>;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Check if there's an existing image URL and confirm before proceeding
      if (
        imageUrl &&
        !window.confirm(
          "Selecting a new image will replace the existing one. Continue?"
        )
      ) {
        // If user cancels, clear the file input and do not proceed
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const file = event.target.files[0];
      setSelectedFile(file);

      // Create a URL for the selected file and update the preview URL
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl);
    } else {
      // If no file is selected, reset to default state
      setSelectedFile(null);
      if (!blog) {
        // Only clear the preview URL if we're not editing a blog with an existing image
        setImagePreviewUrl(null);
      }
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const clearFileInput = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);

    if (isUpdateMode && imageUrl) {
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl(null);
    }

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
      (!selectedFile && !isUpdateMode)
    ) {
      setMessage("Please enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categories", selectedCategories.join(","));

    // Append the file if selected, otherwise append the existing imageUrl for updates
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    } else if (!selectedFile && isUpdateMode && imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    try {
      if (!isUpdateMode) {
        await createBlog(formData).unwrap();
      } else if (isUpdateMode && blog) {
        await updateBlog({ id: blog.id, formData }).unwrap();
      }
    } catch (err) {
      console.error(
        `Failed to ${isUpdateMode ? "update" : "create"} blog`,
        err
      );
      setMessage(
        `Failed to ${
          isUpdateMode ? "update" : "create"
        } the blog. Please try again.`
      );
    }
  };

  return (
    <div className="container mx-auto my-10 px-4 md:px-0">
      <p className="text-3xl font-semibold">
        {mode === "create" ? "Add Blog" : "Update Blog"}
      </p>
      <form className="w-full mt-5" onSubmit={handleSubmit}>
        <div className="my-3">
          <label className="md:mb-0 pr-4 font-semibold mb-1" htmlFor="title">
            Title:
          </label>
          <input
            className="appearance-non border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-2">
          <p className="mb-1 font-semibold">Categories:</p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => {
              const isSelected = selectedCategories.some(
                (cat) =>
                  cat.trim().toLowerCase() === category.trim().toLowerCase()
              );
              return (
                <button
                  key={category}
                  type="button"
                  className={classNames(
                    "border text-sm py-1 px-2 rounded-full",
                    {
                      "bg-black text-white": isSelected,
                      "bg-transparent text-black hover:bg-black hover:text-white":
                        !isSelected,
                    }
                  )}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              );
            })}
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
        <div className="mt-[100px] md:mt-14 mb-4">
          <img
            src={
              imagePreviewUrl || imageUrl || "https://via.placeholder.com/200"
            }
            alt="Preview"
            className="max-w-xs w-full h-[200px]"
          />
        </div>
        <div className=" mb-3">
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
        {message && <p className="text-red-500">{message}</p>}
        {isError && <p className="text-red-500">{(error as Error).message}</p>}
        <div className="flex justify-end">
          <button
            className={classNames(
              "shadow bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full md:w-auto",
              {
                "hover:bg-gray-700": !isLoadingFormSubmit,
                "opacity-50 cursor-not-allowed": isLoadingFormSubmit,
              }
            )}
            type="submit"
            disabled={isLoadingFormSubmit}
          >
            {isLoadingFormSubmit ? (
              <Spinner />
            ) : isUpdateMode ? (
              "Update Blog"
            ) : (
              "Create Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
