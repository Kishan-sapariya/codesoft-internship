import React, { useEffect, useState } from "react";
import { EllipsisVertical, Heart, MessageCircle } from "lucide-react";
import { useBlogStore } from "../store/useBlogStore";
import useLikeStore from "../store/useLikeStore";
import EditDeleteComponent from "./EditDeleteComponent";
import CommentModal from "./CommentModal";

const BlogCard = ({ posts }) => {
  const { toggleLike, isLiked, initializeLikes, getLikeCount, likeCounts } =
    useLikeStore();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openCommentModalId, setOpenCommentModalId] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const storeBlogs = useBlogStore((state) => state.blogs);
  const blogs = Array.isArray(posts)
    ? posts
    : Array.isArray(storeBlogs)
    ? storeBlogs
    : [];

  useEffect(() => {
    initializeLikes();
    if (blogs.length > 0) {
      blogs.forEach((blog) => {
        getLikeCount(blog.id);
      });
    }
  }, [blogs]);

  const toggleMenu = (blogId) => {
    setOpenMenuId(openMenuId === blogId ? null : blogId);
  };

  const initialLetter = (username) => {
    return username?.charAt(0).toUpperCase() || "";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleComment = (blogId) => {
    setOpenCommentModalId(openCommentModalId === blogId ? null : blogId);
  };

  const toggleExpand = (blogId) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
  };

  const shouldShowReadMore = (content) => {
    return content.split(/\s+/).length > 30;
  };

  return (
    <div className="w-full h-full p-4 mt-2">
      <div
        className={`${
          posts
            ? "grid grid-cols-1 space-y-4"
            : "grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        }`}
      >
        {blogs.length === 0 && (
          <div className="flex justify-center items-center text-gray-500 text-xl font-semibold">
            <h1>No blogs available</h1>
          </div>
        )}
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="relative flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover object-fit"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="rounded-full bg-emerald-100 w-10 h-10 flex items-center justify-center border-2 border-emerald-300 ">
                    <span className="text-emerald-700 font-semibold">
                      {initialLetter(blog.username)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {blog.username}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(blog.created_at)}
                    </p>
                  </div>
                </div>
                <EllipsisVertical
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => toggleMenu(blog.id)}
                />
                {openMenuId === blog.id && <EditDeleteComponent id={blog.id} />}
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-2">
                {blog.title}
              </h1>
              <p
                className={`text-gray-600 transition-all duration-300 ${
                  expandedBlogId === blog.id
                    ? "max-h-36 overflow-y-auto border border-gray-300 rounded-md p-2 [&::-webkit-scrollbar]:w-1 [::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 "
                    : "line-clamp-3"
                } mb-4`}
              >
                {blog.content}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Heart
                      className={`size-6 cursor-pointer ${
                        isLiked(blog.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      onClick={() => toggleLike(blog.id)}
                    />
                    <span className="text-sm text-gray-600">
                      {likeCounts[blog.id]}
                    </span>
                  </div>
                  <MessageCircle
                    className="size-6 cursor-pointer text-gray-500 hover:text-emerald-500"
                    onClick={() => handleComment(blog.id)}
                  />
                </div>

                {shouldShowReadMore(blog.content) && (
                  <button
                    onClick={() => toggleExpand(blog.id)}
                    className="text-sm text-emerald-500 hover:text-emerald-600 font-semibold"
                  >
                    {expandedBlogId === blog.id ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>

            {openCommentModalId === blog.id && (
              <CommentModal
                id={blog.id}
                onClose={() => setOpenCommentModalId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
