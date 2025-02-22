import React, { useState } from "react";
import { useBlogStore } from "../store/useBlogStore";
import { LoaderIcon } from "react-hot-toast";

const EditModal = ({ id, onClose }) => {
  const { blogs, updateBlog, isUpdatingBlog,getAllBlogs } = useBlogStore();
  const currentBlog = blogs.find((blog) => blog.id === id);
  const [blogData, setBlogData] = useState({
    title: currentBlog.title,
    content: currentBlog.content,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(id, blogData);
    await getAllBlogs(); 
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-lg p-12 py-16 rounded-lg">
        <h1 className="text-center text-emerald-500 text-3xl font-bold mb-4">
          Update <span className="text-black">Blog</span>
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={blogData.title}
            className="w-full p-2 px-4 border-2 rounded mb-4 focus:outline-none focus:border-black"
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
          />
          <textarea
            placeholder="Content"
            value={blogData.content}
            className="w-full p-2 px-4 border-2 rounded mb-4 focus:outline-none focus:border-black min-h-[150px]"
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full p-2 text-center bg-emerald-400 hover:bg-emerald-500 text-black rounded"
            >
              {isUpdatingBlog ? <LoaderIcon /> : "Update Blog"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full p-2 text-center bg-gray-200 hover:bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
