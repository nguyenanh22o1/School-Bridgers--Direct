const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        avaUrl: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        cloudinaryId: {
            type: String
        },
        title: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            minlength: 4,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);