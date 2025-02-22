import React, { useEffect } from "react";
import { useBlogStore } from "../store/useBlogStore";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const { getAllBlogs } = useBlogStore();
  useEffect(() => {
    getAllBlogs();
  }, []);
  
  return (
    <div>
      <BlogCard />
    </div>
  );
};

export default Home;
