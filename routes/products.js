const express = require("express");

const productController = require("../controllers/products");
const isAuth = require("../auth/isAuth");

const router = express.Router();

router.get("/add-product", isAuth, productController.getAddProduct);
router.post("/add-product", isAuth, productController.postAddProduct);
router.get("/products", productController.getProducts);
router.get("/product/:productId", productController.getProductDetails);
// /product/3

router.get("/edit-product/:productId", isAuth, productController.getEditProducts);
router.post("/edit-product/:productId", isAuth, productController.postEditPost);
router.get("/delete-product/:productId", isAuth, productController.getDeleteProduct);

module.exports = router;