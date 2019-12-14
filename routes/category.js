const express = require("express");

const categoryController = require("../controllers/category");
const isAuth = require("../auth/isAuth");

const router = express.Router();

router.get("/add-category", isAuth, categoryController.getAddCategory);
router.post("/add-category", isAuth, categoryController.postAddCategory);
router.get("/categories", categoryController.getCategories);

module.exports = router;