const User = require("../models/User");
const authController = require("./authControllers");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// require("./config");

const userController = {
    //Get All users
    getAllUsers: async (req, res) => {
        try {
            //find() return all user
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            //v1/user/123

            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    searchAll: async (req, res) => {
        try {
            const user = await User.find({
                "$or": [
                    { username: { $regex: req.params.key } },
                    { university: { $regex: req.params.key } }
                ]
            })
                .limit(2)
                .select("username university profilePicture ")
                .exec();
            // console.log(user);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },


    //FOLLOW A USER
    followPage: async (req, res) => {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                //If user not follow yet
                if (!user.followers.includes(req.body.userId)) {
                    if (user.isSchoolAdmin == true) {
                        await User.findByIdAndUpdate(req.params.id, {
                            $push: { followers: req.body.userId },
                        });
                        const updatedUser = await User.findByIdAndUpdate(
                            req.body.userId,
                            {
                                $push: { followings: req.params.id },
                            },
                            { returnDocument: "after" }
                        );
                        return res.status(200).json(updatedUser);
                    }
                    return res.status(404).json("Student can't follow other student");

                } else {
                    await User.findByIdAndUpdate(req.params.id, {
                        $pull: { followers: req.body.userId },
                    });
                    const updateUser = await User.findByIdAndUpdate(
                        req.body.userId,
                        {
                            $pull: { followings: req.params.id },
                        },
                        { returnDocument: "after" }
                    );
                    return res.status(200).json(updateUser);
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("Can't follow yourself");
        }
    },


    //
    getFollowing: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            // console.log(user);
            // const followingPerson = await User.find(user.followers);
            res.status(200).json(user.followings);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Update
    //UPDATE A USER
    updateUser: async (req, res) => {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id.trim(),
                {
                    $set: req.body,
                },
                { returnDocument: "after" }
            ).select("+password");
            const accessToken = await authController.generateAccessToken(user);
            if (req.body.profilePicture) {
                try {
                    await Post.updateMany(
                        { userId: req.params.id },
                        {
                            $set: { avaUrl: req.body.profilePicture },
                        }
                    );
                    await Comment.updateMany(
                        { ownerId: req.params.id },
                        {
                            $set: { avaUrl: req.body.profilePicture },
                        }
                    );
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
            const returnedUser = {
                ...user._doc,
                accessToken: accessToken,
            };
            res.status(200).json(returnedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;