const middlewareController = require("../controllers/middlewareControllers");
const userController = require("../controllers/userControllers");
const reviewController = require("../controllers/reviewControllers");

const router = require("express").Router();

//GET ALL USER (ADMIN) (đã test 27/1/2023)
router.get("/all", middlewareController.verifyToken, userController.getAllUsers);

//delete user
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

//GET A USER       (đã test 27/1/2023)
router.get("/:id", middlewareController.verifyToken, userController.getUser);

//Search for page/user
router.get("/search/:key", middlewareController.verifyToken, userController.searchAll);

//FOLLOW A USER
router.put("/follow/:id", middlewareController.verifyToken, userController.followPage);


//ADD A REVIEW 
router.post("/review/:id", middlewareController.verifyToken, reviewController.addReview);

//GET ALL REVIEW IN UNIVERSITY 
router.get("/review/:id", middlewareController.verifyToken, reviewController.getReviewsInPost);

//DELETE A COMMENT 
router.delete("/review/:id", middlewareController.verifyTokenAndCommentAuthorization, reviewController.deleteReview);

router.get("/following/:id", middlewareController.verifyToken, userController.getFollowing);

//UPDATE A USER
router.put("/:id", middlewareController.verifyTokenAndUserAuthorization, userController.updateUser);

module.exports = router;