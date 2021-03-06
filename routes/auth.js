const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/signup",authController.getSignUp);
router.post("/signup", authController.postSingUp);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

module.exports = router;