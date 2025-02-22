import React, { useState } from "react";
import { useBlogStore } from "../store/useBlogStore";
import { LoaderIcon } from "react-hot-toast";

const CreateBlog = () => {
  const { isCreatingBlog, createBlog } = useBlogStore();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: null, 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: blogData.title,
      content: blogData.content,
      image: null, 
    };

    if (blogData.image) {
      const reader = new FileReader();
      reader.readAsDataURL(blogData.image);

      reader.onloadend = async () => {
        formData.image = reader.result; 

        await createBlog(formData); 

        setBlogData({ title: "", content: "", image: null });
      };
    } else {
      await createBlog(formData);
      setBlogData({ title: "", content: "", image: null }); 
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-center text-emerald-500 text-3xl font-bold mb-6">
          Create <span className="text-black">Blog</span>
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={blogData.title}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-emerald-500"
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
          />

          <textarea
            placeholder="Content"
            value={blogData.content}
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-emerald-500 min-h-[120px]"
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setBlogData({ ...blogData, image: e.target.files[0] })
            }
          />

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 p-3 bg-emerald-400 hover:bg-emerald-500 text-black font-semibold rounded-lg transition-all duration-200"
          >
            {isCreatingBlog ? <LoaderIcon size={24} /> : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
