const express = require("express");
const postRouter = express.Router();

const {
    createPost,
    getPostsByUser,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment
} = require("../controllers/postController");

postRouter.post("/create", createPost);
postRouter.get("/get/:userName", getPostsByUser);
postRouter.get("/", getPostById);
postRouter.patch("/update", updatePost);
postRouter.delete("/delete", deletePost);
postRouter.post("/like", likePost);
postRouter.post("/unlike", unlikePost);
postRouter.post("/comment", commentOnPost);
postRouter.patch("/comment/update", updateComment);
postRouter.delete("/comment/delete", deleteComment);
postRouter.post("/comment/like", likeComment);
postRouter.post("/comment/unlike", unlikeComment);

module.exports = postRouter;