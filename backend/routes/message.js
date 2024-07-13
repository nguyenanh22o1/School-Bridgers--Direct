const router = require("express").Router();
const middlewareController = require("../controllers/middlewareControllers");
const messageController = require("../controllers/messageControllers");

//CREATE A MESSAGE
router.post("/", middlewareController.verifyToken, messageController.createMessage);

//GET MESSAGE
router.get("/:conversationId", middlewareController.verifyToken, messageController.getMessage);

module.exports = router;