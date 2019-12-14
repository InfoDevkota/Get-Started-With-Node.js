const express = require("express");

const profileController = require("../controllers/profile");
const isAuth = require("../auth/isAuth");

const router = express.Router();

router.get("/me", isAuth, profileController.getMyProfile);
router.get("/profile/:userId", profileController.getProfile);

module.exports = router;