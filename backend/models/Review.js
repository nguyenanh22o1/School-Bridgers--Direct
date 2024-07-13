const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        uniId: {
            type: String,
        },
        reviewerId: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            require: true,
            max: 5,
            min: 0,
        },
        content: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        avaUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);