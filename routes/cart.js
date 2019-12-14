const express = require("express");

const cartController = require("../controllers/cart");
const isAuth = require("../auth/isAuth");

const router = express.Router();

router.get("/add-to-cart/:productId/:quantity", isAuth, cartController.addToCart)
//router.get("/add-to-cart", isAuth, cartController.addToCart)
router.get("/cart", isAuth, cartController.getCart);

module.exports = router