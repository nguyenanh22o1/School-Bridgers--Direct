const jwt = require("jsonwebtoken");

const middlewareController = {
    // verify Token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {

            const accessToken = token.split(" ")[1];

            //verify
            jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                //return forbiden
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                //neu 0 err thi chay tiep
                else {
                    req.user = user;
                    next(); //di tiep
                }

            });
        }
        else {
            //Not authenticated
            res.status(401).json("ERR");
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            //check isAdmin || check correct user
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("You r not allowed to delete order");
            }
        });
    },

    verifyTokenAndUserAuthorization: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id.trim() || req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json("You're not allowed to do that!");
            }
        });
    },

    verifyTokenAndUserPostAuthorization: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.body.userId || req.user.isSchoolAdmin) {
                next();
            } else {
                return res.status(403).json("You're not allowed to do that!");
            }
        });
    },

    verifyTokenAndCommentAuthorization: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            console.log("req.user.id: " + req.user.id);
            console.log("ownerId: :" + req.body.ownerId);
            if (
                req.user.id === req.body.ownerId ||
                req.user.isAdmin ||
                req.user.id === req.body.postId
            ) {
                next();
            } else {
                return res.status(403).json("You're not allowed to do that!");
            }
        });
    },

    paginatedResult: (model) => {
        return async (req, res, next) => {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const byVotes = req.query.hot;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};

            if (endIndex < (await model.countDocuments().exec())) {
                results.next = {
                    page: page + 1,
                    limit: limit,
                };
            }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            try {
                if (page && limit && byVotes) {
                    results.results = await model
                        .find()
                        .sort({ upvotes: -1 })
                        .limit(limit)
                        .skip(startIndex)
                        .exec();
                    res.paginatedResults = results;
                    next();
                } else {
                    results.results = await model
                        .find()
                        .sort({ createdAt: -1 })
                        .limit(limit)
                        .skip(startIndex)
                        .exec();
                    res.paginatedResults = results;
                    next();
                }
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        };
    },


}

module.exports = middlewareController;
