import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const BlogEditor: FC<BlogEditorProps> = ({ content, setContent }) => {
  return (
    <ReactQuill value={content} onChange={setContent} className="h-full" />
  );
};

export default BlogEditor;
