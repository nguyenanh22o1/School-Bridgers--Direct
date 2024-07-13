const { isEmail } = require("validator");
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "Required"],
            minlength: [8, "Must be at least 8 characters"],
            unique: true
        },
        firstName: {
            type: String,
            require: [true, "Required"],
        },
        lastName: {
            type: String,
            require: [true, "Required"],
        },
        university: {
            type: String,
        },
        email: {
            type: String,
            require: [true, "Required"],
            unique: true,
            validate: [isEmail, "Please enter a valid email"],
        },
        phonenumber: {
            type: String,
            // require: [true, "Required"],
        },
        password: {
            type: String,
            require: true,
            select: false,
        },
        isSchoolAdmin: {
            type: Boolean,
        },
        about: {
            type: String,
        },
        profilePicture: {
            type: String,
            default:
                "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        reviews: {
            type: Number,
            default: 0,
        },
        theme: {
            type: String,
            default:
                "https://pbs.twimg.com/profile_banners/15808647/1680705029/1500x500",
        }

    }, { timestamps: true }
);
userSchema.plugin(uniqueValidator, {
    message: "Error, expected {PATH} to be unique",
});

module.exports = mongoose.model("User", userSchema);
