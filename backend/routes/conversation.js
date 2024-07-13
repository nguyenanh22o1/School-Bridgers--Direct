const router = require("express").Router();
const middlewareController = require("../controllers/middlewareControllers");
const conversationController = require("../controllers/conversationControllers");

//CREATE CONVERSATION
router.post("/", middlewareController.verifyToken, conversationController.createConversation);

//GET CONVERSATION OF A USER
router.get("/:userId", middlewareController.verifyToken, conversationController.getConversation);

//GET AVAILABLE CONVERSATIONS BETWEEN USERS
router.get("/find/:firstUser/:secondUser", middlewareController.verifyToken, conversationController.getAvailableConversation);

module.exports = router;