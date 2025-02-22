import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useAuthStore } from "../store/useAuthStore";
import { useProfileStore } from "../store/useProfileStore";
import EditProfile from "../components/EditProfile";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const { user } = useAuthStore();
  const { getAllPostById, userPosts, getAllLikedPostByUserId, likedPost,getProfileByUsername } =
    useProfileStore();
  const {username}=useParams();

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  useEffect(() => {
    if (username) {
      getProfileByUsername(username);
      if (selectedTab === "Posts") {
        getAllPostById(user.id);
      } else if (selectedTab === "Likes") {
        getAllLikedPostByUserId(user.id);
      }
    }
  }, [selectedTab, username,user.id]);
  

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

  return (
    <div className="min-h-screen my-16 max-w-xl p-10 bg-white rounded-sm shadow-lg mx-auto">
      {!showEditProfile ? (
        <>
          <div className="relative flex flex-col justify-center bg-slate-900 rounded p-8">
            <div className="w-20 h-20 rounded-full border-2 bg-emerald-400 border-white border-spacing-2 mb-4 flex items-center justify-center">
              <p className="text-center text-black font-semibold text-2xl">
                {initialLetter(user.username)}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-white font-semibold">
                @{user.username}
              </h1>
              <h1 className="text-gray-400 font-semibold">{user.email}</h1>
              <p className="text-gray-500">
                joined at {formatDate(user.created_at)}
              </p>
              <p className="text-gray-300">{user.bio}</p>
              <a
                href="https://google.com"
                className="text-white hover:underline"
              >
                {user?.link || null}
              </a>
            </div>
            <button
              className="px-3 py-2 absolute top-14 right-6 bg-emerald-400 hover:bg-emerald-500 rounded text-black"
              onClick={handleEditProfile}
            >
              Edit profile
            </button>
          </div>
          <div className="flex justify-around mt-4">
            <h1
              className={`text-xl cursor-pointer px-4 py-1 ${
                selectedTab === "Posts"
                  ? "border-b-2 border-emerald-400"
                  : "hover:bg-gray-200 rounded-sm"
              }`}
              onClick={() => setSelectedTab("Posts")}
            >
              Posts
            </h1>
            <h1
              className={`text-xl cursor-pointer px-4 py-1 ${
                selectedTab === "Likes"
                  ? "border-b-2 border-emerald-400"
                  : "hover:bg-gray-200 rounded-sm"
              }`}
              onClick={() => setSelectedTab("Likes")}
            >
              Likes
            </h1>
          </div>
          <div className="w-full border mt-2"></div>
          <div className="mt-4 w-full h-[32rem] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200">
            {selectedTab === "Posts" && <BlogCard posts={userPosts} />}
            {selectedTab === "Likes" && <BlogCard posts={likedPost} />}
          </div>
        </>
      ) : (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
};

export default Profile;
