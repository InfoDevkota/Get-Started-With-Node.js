const express = require("express");

const homePageController = require("../controllers/homepage");

const router = express.Router();

router.get("/", homePageController.getHomePage);
router.get("/login", homePageController.getLogin);

module.exports = router;