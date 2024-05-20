const {
  registerController,
  loginController,
} = require("../controller/authController");

const router = require("express").Router();

router.post("/signup", registerController);
router.post("/login", loginController);
module.exports = router;
