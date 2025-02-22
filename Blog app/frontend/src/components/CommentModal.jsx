import React, { useEffect, useState } from "react";
import useCommentStore from "../store/useCommentStore";
import toast from "react-hot-toast";

const CommentModal = ({ id, onClose }) => {
  const { getComments, postComment, commentsByBlogId } = useCommentStore();
  const [comment, setComment] = useState("");
  const blogComments = commentsByBlogId[id] || [];

  useEffect(() => {
    if (id) {
      getComments(id);
    }
  }, [id, getComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.length === 0) {
      toast.error("Comment cannot be empty");
      return;
    }
    postComment({ content: comment }, id);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-lg shadow-lg rounded-xl p-6 md:p-8">
        <h1 className="text-center text-emerald-500 text-2xl font-semibold mb-6">
          Comments
        </h1>
        <form className="mb-6" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a comment..."
            value={comment}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-emerald-500 resize-none min-h-[80px]"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="w-full p-2 text-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-md transition"
            >
              Post Comment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full p-2 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-md transition"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {blogComments.length > 0 ? (
            blogComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200 shadow-sm"
              >
                <div className="font-semibold text-gray-800 mb-1">
                  {comment.username}
                </div>
                <p className="text-gray-600 text-sm">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
