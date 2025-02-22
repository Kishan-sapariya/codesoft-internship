import { Likes } from "../model/likes.model.js";
import pool from "../config/db.js";

export const likeBlog = async (req, res) => {
  const blog_id = req.params.id;
  const authuser_id = req.user.userId;
  try {
    const likeBlog = await Likes.likeBlog(blog_id, authuser_id);
    res.status(200).json({
      success: true,
      message: likeBlog.message || "Blog liked successfully",
      data: likeBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const unLikeBlog = async (req, res) => {
  const blog_id = req.params.id;
  const authuser_id = req.user.userId;
  try {
    const result = await Likes.unLikeBlog(blog_id, authuser_id);
    res.status(200).json({
      success: true,
      message: "Blog unliked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to unlike blog",
    });
  }
};

export const hasLiked = async (req, res) => {
  const { blog_id } = req.params;
  const authuser_id = req.user.userId;
  try {
    const hasLiked = await Likes.hasLiked(blog_id, authuser_id);
    res.status(200).json({
      success: true,
      hasLiked: !!hasLiked,
    });
  } catch (error) {
    console.log("Error in hasLiked", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getLikesCount = async (req, res) => {
  const blog_id = req.params.blog_id;

  if (!blog_id || isNaN(blog_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid blog_id",
    });
  }

  try {
    const count = await Likes.getLikesCount(blog_id);
    res.status(200).json({
      message: "like count fetched successfully",
      count: count, // Return the count directly
    });
  } catch (error) {
    console.log("Error in getLikesCount", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getLikedBlogsByUser = async (req, res) => {
  const authuser_id = req.user.userId;
  try {
    const result = await pool.query(
      "SELECT blog_id FROM likes WHERE authuser_id = $1",
      [authuser_id]
    );
    const likedBlogs = result.rows.map((row) => parseInt(row.blog_id));
    res.status(200).json({
      success: true,
      likedBlogs: likedBlogs,
    });
  } catch (error) {
    console.error("Error fetching liked blogs:", error);
    res.status(500).json({
      success: false,
      likedBlogs: [],
    });
  }
};

export const getLikesByUsername=async(req,res)=>{
  const blog_id=req.params.blog_id;
  try {
    const result=await Likes.getLikesByUsername(blog_id);
    res.status(200).json({
      success: true,
      username: result,
    });
    return result;
  } catch (error) {
    console.log("Error in getLikesByUsername", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}