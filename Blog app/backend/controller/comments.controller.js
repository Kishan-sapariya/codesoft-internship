import { Comments } from "../model/comments.model.js";

export const commentOnBlog=async(req,res)=>{
    const {blog_id}=req.params;
    const {content}=req.body;
    const authuser_id=req.user.userId;
    try {
        const comment=await Comments.commentOnBlog(blog_id,authuser_id,content);
        res.status(200).json({
            success:true,
            message:"Commented on blog",
            comment
        })
    } catch (error) {
        console.log("Error in commentOnBlog",error);
    }
}

export const deleteComment=async(req,res)=>{
    const {blog_id}=req.params;
    const authuser_id=req.user.userId;
    try {
        const comment=await Comments.deleteComment(blog_id,authuser_id);
        if(!comment){
            return res.status(404).json({
                success:false,
                message:"Fill in the required fields"
            })
        }
        res.status(200).json({
            success:true,
            message:"comment deleted",
            comment
        })
    } catch (error) {
        console.log("Error in delete comment",error);
    }
}

export const getComments=async(req,res)=>{
    const {blog_id}=req.params;
    try {
        const comments=await Comments.getComments(blog_id);
        res.status(200).json({
            success:true,
            message:"comments fetched",
            comments
        })
    } catch (error) {
        console.log("Error in getComments",error);
    }
}