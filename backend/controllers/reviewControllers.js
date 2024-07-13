const Post = require("../models/Post");
const User = require("../models/User");
const Review = require("../models/Review");

const reviewController = {
    //ADD A REVIEW
    addReview: async (req, res) => {
        try {
            const reviewer = await User.findById(req.body.reviewerId);
            const temp = await User.findById(req.params.id);
            if (!temp.isSchoolAdmin)
                return res.status(500).json("Student can't not review other student?");
            // const alreadyReview = await Review.find()
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { reviews: 1 } }
            );
            const makeReview = {
                ...req.body,
                uniId: req.params.id,
                username: reviewer.username,
                avaUrl: reviewer.profilePicture
            };
            const newReview = new Review(makeReview);
            const savedReview = await newReview.save();
            return res.status(200).json(savedReview);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //GET ALL COMMENTS IN A POST
    getReviewsInPost: async (req, res) => {
        try {
            const review = await Review.find({ uniId: req.params.id });
            res.status(200).json(review);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE REVIEW
    deleteReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            console.log(review);
            await Review.findByIdAndDelete(req.params.id);
            await User.findOneAndUpdate(
                { _id: review.uniId },
                { $inc: { reviews: -1 } }
            );
            res.status(200).json("Delete review succesfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = reviewController;