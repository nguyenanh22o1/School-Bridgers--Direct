const middlewareController = require("../controllers/middlewareControllers");
const rankingController = require("../controllers/rankingController");

const router = require("express").Router();

//GET NEWS
router.get("/", rankingController.getRank);

module.exports = router;