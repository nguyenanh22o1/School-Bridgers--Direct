const router = require("express").Router();
const Post = require("../models/Post");
const commentController = require("../controllers/commentControllers");
const middlewareController = require("../controllers/middlewareControllers");
const postController = require("../controllers/postControllers");
const upload = require("../utils/multer");

//CREATE A POST (đã test 28/1)
router.post("/", upload.single("image"), middlewareController.verifyToken, postController.createPost);

//UPDATE A POST (đã test 28/1)
router.put("/:id", middlewareController.verifyTokenAndUserPostAuthorization, postController.updatePost);

//DELETE A POST     (đã test 28/1)
router.delete("/:id", middlewareController.verifyTokenAndUserPostAuthorization, postController.deletePost);

//GET A POST    (đã test 28/1)
router.get("/fullpost/:id", middlewareController.verifyToken, postController.getAPost);

// GET ALL POST FROM A USER     (đã test 28/1)
router.get("/user/:id", middlewareController.verifyToken, postController.getPostsFromOne);

// GET ALL POSTS    (đã test 28/1)
router.get("/", middlewareController.verifyToken, middlewareController.paginatedResult(Post), postController.getAllPosts);

// //GET TIMELINE POST
router.post("/followingpost", middlewareController.verifyToken, postController.getFriendsPost);

//Like A POST   (đã test 28/1)
router.put("/like/:id", middlewareController.verifyToken, postController.likePost);

//ADD A COMMENT (đã test 29/1)
router.post("/comment/:id", middlewareController.verifyToken, commentController.addComment);

//GET ALL COMMENTS (đã test 29/1)
router.get("/comments", middlewareController.verifyToken, commentController.getAllComments);

//GET ALL COMMENTS IN A POST (đã test 29/1)
router.get("/comment/:id", middlewareController.verifyToken, commentController.getCommentsInPost);

//DELETE A COMMENT (đã test 29/1)
router.delete("/comment/:id", middlewareController.verifyTokenAndCommentAuthorization, commentController.deleteComment);


module.exports = router;