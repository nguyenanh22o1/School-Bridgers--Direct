const Post = require("../models/Post");
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");

const postController = {
    //CREATE A POST
    createPost: async (req, res) => {
        try {
            const users = await User.findById(req.body.userId);
            if (req.body.imageUrl) {
                const result = await cloudinary.uploader.upload(req.body.imageUrl, {
                    public_id: "post_Img",
                });
                const makePost = {
                    ...req.body,
                    imageUrl: result.secure_url,
                    cloudinaryId: result.public_id,
                    username: users.username,
                    avaUrl: users.profilePicture,
                };
                const newPost = new Post(makePost);
                const savedPost = await newPost.save();
                return res.status(200).json(savedPost);
            } else {
                const makePost = {
                    ...req.body,
                    username: users.username,
                    avaUrl: users.profilePicture,
                };
                const newPost = new Post(makePost);
                const savedPost = await newPost.save();
                return res.status(200).json(savedPost);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE A POST
    updatePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id.trim());
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json("Post has been updated");
            } else {
                res.status(403).json("You can only update your post");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE A POST
    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            await Post.findByIdAndDelete(req.params.id);
            if (post.cloudinaryId) {
                await cloudinary.uploader.destroy(post.cloudinaryId);
            }
            res.status(200).json("Delete post succesfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET ALL POST FROM A USER
    getPostsFromOne: async (req, res) => {
        try {
            const post = await Post.find({ userId: req.params.id });
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET ALL POST FROM USER FOLLOWINGS
    getFriendsPost: async (req, res) => {
        try {
            const currentUser = await User.findById(req.body.userId);
            const userPost = await Post.find({ userId: req.body.userId });
            const friendPost = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.status(200).json(userPost.concat(...friendPost));
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET ALL POSTS
    getAllPosts: async (req, res) => {
        try {
            res.status(200).json(res.paginatedResults);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //GET A POST
    getAPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //UPVOTE A POST
    likePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // console.log(post);
            if (!post.likes.includes(req.body.userId)) {
                const temp = await Post.findByIdAndUpdate(req.params.id, {
                    $push: { likes: req.body.userId }
                });
                return res.status(200).json(temp);
            }
            else {
                const temp = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.userId } });
                return res.status(200).json(temp);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

};
module.exports = postController;
