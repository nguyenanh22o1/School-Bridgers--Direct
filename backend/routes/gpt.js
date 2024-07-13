const gptControllers = require("../controllers/gptControllers")
const middlewareController = require("../controllers/middlewareControllers");
const router = require("express").Router();

//GET API
router.post("/", middlewareController.verifyToken, gptControllers.getShit);

module.exports = router;