
const middlewareController = require("../controllers/middlewareControllers");
const newsController = require("../controllers/newController");

const router = require("express").Router();

//GET NEWS
router.get("/", middlewareController.verifyToken, newsController.getNew);

module.exports = router;