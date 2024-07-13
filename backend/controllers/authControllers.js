const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

let refreshTokens = [];

const authController = {
    //create access token
    createAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.ACCESS_KEY, { expiresIn: "365days" });
    },

    //create refresh token
    createRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.REFRESH_KEY, { expiresIn: "365d" });
    },


    //REGISTER
    registerUser: async (req, res) => {
        if (req.body.password.length >= 8) {
            try {
                //hash password
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                //Create new user in DB
                const newUser = await new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    // phonenumber: req.body.phonenumber
                });
                //save to db
                const user = await newUser.save();
                //respond status 200 - mean successful
                res.status(200).json(user);

            } catch (err) {
                res.status(500).json(err.message);
            }
        }
        else {
            res.status(401).json({ message: "Need at least 8 character in password" });
        }
    },

    registerUniversityUser: async (req, res) => {
        if (req.body.password.length >= 8) {
            try {
                //hash password
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(req.body.password, salt);

                //Create new user in DB
                const newUser = await new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                    firstName: req.body.firstName,
                    phonenumber: req.body.phonenumber,
                    lastName: req.body.lastName,
                    university: req.body.university,
                    isSchoolAdmin: true
                });
                //save to db
                const user = await newUser.save();
                //respond status 200 - mean successful
                res.status(200).json(user);

            } catch (err) {
                res.status(500).json(err.message);
            }
        }
        else {
            res.status(401).json({ message: "Need at least 8 character in password" });
        }
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username }).select(
                "+password");
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!checkPassword) {
                return res.status(404).json("Invalid Password");
            }
            else if (user && checkPassword) {
                //access token (SHORT TERM)
                const accessToken = authController.createAccessToken(user);

                //refresh token (LONG TERM)
                const refreshToken = authController.createRefreshToken(user);

                //add refresh token vao array
                refreshTokens.push(refreshToken);

                //store vao cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                return res.status(200).json({ user, accessToken, refreshToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        //get refresh token from cookie 
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json("Not authenticated");
        }

        //check refreshTokens array KHÔNG include request của bản thân
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }

            //filter array
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            //creat new accesstoken, refreshtoken
            const newAccesToken = authController.createAccessToken(user);
            const newRefreshToken = authController.createRefreshToken(user);

            //add new refresh token vao array
            refreshTokens.push(newRefreshToken);

            //store vao cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccesToken });
        });
    },

    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out!");
    },

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isSchoolAdmin: user.isSchoolAdmin,
            },
            process.env.ACCESS_KEY,
            { expiresIn: "15min" }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isSchoolAdmin: user.isSchoolAdmin,
            },
            process.env.REFRESH_KEY,
            { expiresIn: "1d" }
        );
    }

};

module.exports = authController;