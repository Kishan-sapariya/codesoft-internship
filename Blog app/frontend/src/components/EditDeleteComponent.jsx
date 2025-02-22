import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";
import { Edit2, Heart, LoaderIcon, Trash2Icon } from "lucide-react";
import EditModal from "./EditModal";
import useLikeStore from "../store/useLikeStore";

const EditDeleteComponent = ({ id }) => {
  const { isDeletingBlog, deleteBlog, blogs } = useBlogStore();
  const { user } = useAuthStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const currentBlog = blogs.find((blog) => blog.id === id);
  const { getLikesByUsername, LikedUsernames } = useLikeStore();

  const handleDelete = () => {
    deleteBlog(id);
  };

  const handleLike = () => {
    setShowLikes(!showLikes);
    getLikesByUsername(id);
  };

  return (
    <>
      <div className="absolute top-[250px] right-4 w-32 p-2 rounded-lg bg-white shadow-lg">
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={handleLike}
          >
            <Heart className="h-5 w-5 text-red-500" />
            Liked By
          </div>
          {showLikes && (
            <div className="absolute left-[-15px] bottom-[160px] w-40 max-h-32 bg-white shadow-lg rounded-lg p-2 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full z-50">
              <div className="flex flex-col gap-1">
                {LikedUsernames.map((likeData) => (
                  <div
                    key={likeData.authuser_id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    <div className="flex justify-center items-center rounded-[50%] h-10 w-10 py-1 px-4 bg-emerald-100  border-2 border-emerald-300 border-spacing-2">
                      {likeData.username.charAt(0).toUpperCase()}
                    </div>
                    <p>{likeData.username}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {user.id === currentBlog?.authuser_id && (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={handleDelete}
              >
                <Trash2Icon className="h-5 w-5 text-red-500" />
                <p>{isDeletingBlog ? <LoaderIcon /> : "Delete"}</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setShowEditModal(true)}
              >
                <Edit2 className="h-5 w-5" />
                <p>Edit</p>
              </div>
            </>
          )}
        </div>
      </div>
      {showEditModal && (
        <EditModal id={id} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
};

export default EditDeleteComponent;
