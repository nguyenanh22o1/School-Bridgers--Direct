const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareControllers");
const { route } = require("./user");

const router = require("express").Router();

//(đã test 27/1/2023)
router.post("/register", authController.registerUser);

router.post("/uni-register", authController.registerUniversityUser);

//(đã test 27/1/2023)
router.post("/login", authController.loginUser);

//refreshtoken (đã test 27/1/2023)
router.post("/refresh", authController.requestRefreshToken);

//phải có middleware vì phải login được thì mới logout được (đã test 27/1/2023)
router.post("/logout", middlewareController.verifyToken, authController.logoutUser);

module.exports = router;