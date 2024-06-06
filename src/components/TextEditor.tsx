import ReactQuill from "react-quill";
import axios from "axios";
import katex from "katex";
import { FormEvent, useState } from "react";
import { useUser } from "providers/UserProvider";
import { useHistory } from "react-router-dom";
import { POST_TYPES, POST_STATUS } from "utils/constants";
import "assets/textEditor.css";

import "katex/dist/katex.min.css";
import { TextEditorProps } from "types";
window.katex = katex;

const TextEditor: React.FunctionComponent<TextEditorProps> = ({ post }) => {
  const history = useHistory();
  const editMode: boolean = !!post;
  const [title, setTitle] = useState<string>(post?.title ?? "");
  const [value, setValue] = useState<string>(post?.post ?? "");
  const { accessToken } = useUser();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typeChar = (
      document.getElementById("type") as HTMLInputElement
    )?.value.toUpperCase();
    const statusChar = (
      document.getElementById("status") as HTMLInputElement
    )?.value.toUpperCase();
    const type = POST_TYPES[typeChar as keyof typeof POST_TYPES];
    const status = POST_STATUS[statusChar as keyof typeof POST_STATUS];
    try {
      const postId = post?.id;
      const res = editMode
        ? await axios.post(
            "/api/post/edit",
            {
              title,
              post: value,
              postId,
              type,
              status,
            },
            { headers: { authorization: "bearer " + accessToken } }
          )
        : await axios.post(
            "/api/post/write",
            {
              title,
              post: value,
              accessToken,
              type,
              status,
            },

            { headers: { authorization: "bearer " + accessToken } }
          );
      if (res.status === 200) {
        alert("Your post has been posted!");
        history.push("/");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "formula"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="flex items-start justify-center py-12">
      <div className="w-full">
        <form onSubmit={onSubmit}>
          <div className="text-sm text-gray-500 mb-1">Title</div>
          <input
            id="title"
            required
            className="mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
            type="text"
            name="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-1">Post</div>
          <ReactQuill
            theme="snow"
            className="h-[90vh] mb-10"
            value={value || ""}
            onChange={setValue}
            modules={modules}
          />
          <div className="flex justify-end items-center">
            <select
              className="py-2 mr-4 text-sm text-gray-900"
              name="type"
              id="type"
            >
              <option value="blogposts">Blog Posts</option>
              <option value="study">Study</option>
            </select>
            <select
              className="py-2 mr-4 text-sm text-gray-900"
              name="status"
              id="status"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <button
              className="bg-gray-200 text-sm text-gray-900 py-2 px-3 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;
