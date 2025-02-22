import cloudinary from "../config/cloudinary.js";
import { Blogs } from "../model/blog.model.js";

export const createBlog = async (req, res) => {
  const { title, content, image } = req.body;
  const authuser_id = req.user.userId;

  try {
    let imageUrl = null;

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newBlog = await Blogs.createBlog(
      title,
      content,
      authuser_id,
      imageUrl
    );

    res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error in createBlog at blog.controller.js", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.getAllBlogs();
    res.status(200).json({
      message: "fetched All blogs",
      data: blogs,
    });
  } catch {
    console.log("Error in getAllBlogs at blog.controller.js", error);
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await Blogs.getBlogById(id);
    res.status(200).json({
      message: "fetched blogs by id",
      data: blogs,
    });
  } catch {
    console.log("Error in getBlogsById at blog.controller.js", error);
  }
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedBlog = await Blogs.updateBlog(id, title, content);
    res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("Error in updateBlog at blog.controller.js", error);
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blogs.deleteBlog(id);
    res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    console.log("Error in deleteBlog at blog.controller.js", error);
  }
};
