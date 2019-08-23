const express = require("express");

const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/me",profileController.getProfile);

module.exports = router;