
const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

// Functions:
// 1. Create Post
// 2. Get Posts by User
// 3. Get Post by Id
// 4. Update Post
// 5. Delete Post
// 6. Like Post
// 7. Unlike Post
// 8. Comment on Post
// 9. Update Comment
// 10. Delete Comment
// 11. Like Comment
// 12. Unlike Comment

// {
//     title: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//       minLength: 3,
//     },
//     body: {
//       type: String,
//       required: true,
//       unique: false,
//       trim: true,
//     },
//     media: [
//       {
//         type: String,
//         required: false,
//         unique: false,
//         trim: true,
//         minLength: 3,
//       },
//     ],
//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],
//     likes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     uid: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },

// Create Post
const createPost = async (req, res) => {
    try{
        const { title, body, media, uid } = req.body;
        const user = await User.findById(uid);

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const post = await Post.create({ title, body, media, uid });

        user.posts.push(post._id);
        await user.save();
        
        res.status(201).json({ message: "Post created successfully", post });
    }
    catch (err) {
        // validation error
        if(err.name === 'ValidationError'){
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

// Get Posts by User
const getPostsByUser = async (req, res) => {
    try{
        const { userName } = req.params;
        const user = await User.findOne({
            userName
        });
        const posts = await Post.find({ uid: user._id });
        res.status(200).json({ posts });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Get Post by Id
const getPostById = async (req, res) => {
    try{
        const { postId } = req.body;
        const post = await Post.findById(postId);
        res.status(200).json({ post });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Update Post
const updatePost = async (req, res) => {
    try{
        const { postId } = req.body;
        const post = await Post.findById(postId);
        // remove postId from req.body
        delete req.body.postId;
        // update post
        post.set(req.body);
        await post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// Delete Post
const deletePost = async (req, res) => {
    try{
        const { postId } = req.body;
        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// Like Post
const likePost = async (req, res) => {
    try{
        const { postId, uid } = req.body;
        const post = await Post.findById(postId);
        if(post){
            if (post.likes.includes(uid)) {
                return res.status(400).json({ message: "Post already liked" });
            }
            post.likes.push(uid);
            await post.save();
            res.status(200).json({ message: "Post liked successfully", post });
        }
        else{
            res.status(400).json({ message: "Post not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Unlike Post
const unlikePost = async (req, res) => {
    try{
        const { postId, uid } = req.body;
        const post = await Post.findById(postId);
        if(post){
            if (!post.likes.includes(uid)) {
                return res.status(400).json({ message: "Post not liked" });
            }
            post.likes.pull(uid);
            await post.save();
            res.status(200).json({ message: "Post unliked successfully", post });
        }
        else{
            res.status(400).json({ message: "Post not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Comment on Post
const commentOnPost = async (req, res) => {
    try{
        const { postId, uid, body } = req.body;
        const post = await Post.findById(postId);
        if(post){
            const comment = await Comment.create({ body, uid });
            post.comments.push(comment._id);
            await post.save();
            res.status(200).json({ message: "Comment created successfully", comment });
        }
        else{
            res.status(400).json({ message: "Post not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Update Comment
const updateComment = async (req, res) => {
    try{
        const { commentId } = req.body;
        const comment = await Comment.findById(commentId);
        // remove commentId from req.body
        delete req.body.commentId;
        // update comment
        comment.set(req.body);
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully", comment });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Delete Comment
const deleteComment = async (req, res) => {
    try{
        const { commentId } = req.body;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// Like Comment
const likeComment = async (req, res) => {
    try{
        const { commentId, uid } = req.body;
        const comment = await Comment.findById(commentId);
        if(comment){
            if (comment.likes.includes(uid)) {
                return res.status(400).json({ message: "Comment already liked" });
            }
            comment.likes.push(uid);
            await comment.save();
            res.status(200).json({ message: "Comment liked successfully", comment });
        }
        else{
            res.status(400).json({ message: "Comment not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

// Unlike Comment
const unlikeComment = async (req, res) => {
    try{
        const { commentId, uid } = req.body;
        const comment = await Comment.findById(commentId);
        if(comment){
            if (!comment.likes.includes(uid)) {
                return res.status(400).json({ message: "Comment not liked" });
            }
            comment.likes.pull(uid);
            await comment.save();
            res.status(200).json({ message: "Comment unliked successfully", comment });
        }
        else{
            res.status(400).json({ message: "Comment not found" });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
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
};