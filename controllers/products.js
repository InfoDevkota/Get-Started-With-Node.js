const fs = require('fs');

const Product = require("../models/product");
const Category = require("../models/category");

const Cart = require("../models/cart"); 
const User = require("../models/user");

module.exports.getAddProduct = (req,res,next) =>{
    
    Category.find() //WHY? we need to pass categories to select from DropDown
    .then(categories =>{
        //console.log(categories);
        res.render("addProduct", {
            categories: categories
        })
    })
    //res.render("addProduct");
}

module.exports.postAddProduct = (req,res,next) =>{
    const productTitle = req.body.title;
    const categoryId = req.body.categoryId
    const price = req.body.price
    const quantity = req.body.quantity

    const product = new Product({
        title: productTitle,
        postedBy: req.session.user,
        category: categoryId,
        imageUrl: req.files[0].path,
        price: price,
        availableQuantity: quantity
    })

    for(let i = 1; i < req.files.length; i++){
        product.images.push(req.files[i].path)
    }

    product
    .save()
    .then(product =>{
        res.redirect("/");
    })
    //res.redirect("/");
}

module.exports.getProducts = (req,res,next) =>{
    Product.find()
    .populate("postedBy category")
    .then(products =>{
        res.render("products", {
            products: products
        })
    })
}

// module.exports.putEditProduct = (req,res,next) =>{

// }

module.exports.getProductDetails = (req,res,next) =>{
    const productId = req.params.productId;
    let isAdded = false;
    let isLogin = req.session.isLoggedIn;
    let isAdmin = false;
    //console.log("on Detail Page");
    //console.log(productId);

    if(isLogin){
        isAdmin = req.session.user.isAdmin;
        //TODO double check the admin
    }

    Cart.findOne({cartBy:req.session.user})
    .then(cart=>{
        if(cart){
            cart.products.forEach(product => {
                //console.log(product)
                if(productId == product.product){
                    //console.log("Already in Cart");
                    isAdded = true;
                } else {
                    //console.log("Not in cart");
                }
            });
        }
        Product
        .findOne({_id: productId})
        .populate("postedBy category")
        .then(product =>{
            let canEdit = false;

            if(req.session.user != null){
                if(product.postedBy._id == req.session.user._id){
                    canEdit = true
                }
            }
            
            res.render("product-detail", {
                product,
                canEdit,
                isAdded,
                isLogin,
                isAdmin
            })
        })
    })
}

module.exports.getEditProducts = (req,res,next) =>{
    const productId = req.params.productId;
    
    Product
    .findOne({_id: productId})
    .then(product =>{
        Category.find() //WHY? we need to pass categories to select from DropDown
        .then(categories =>{
            res.render("editProduct", {
                product: product,
                categories: categories
            })
        })
    })
}

module.exports.postEditPost = (req,res,next) =>{
    const productId = req.params.productId;
    const newProductTitle = req.body.title;
    const newPrice = req.body.price
    const newQuantity = req.body.quantity

    Product
    .findOne({_id: productId})
    .then(product =>{
        product.title = newProductTitle;
        product.price = newPrice;
        product.availableQuantity = newQuantity;
        
        return product.save()
    })
    .then(savedProduct =>{
        res.redirect("/product/" +productId);
    })
}

module.exports.getDeleteProduct = (req,res,next) =>{
    const productId = req.params.productId;
    Product
    .findOne({_id: productId})
    .then(product =>{
        if(product.postedBy._id == req.session.user._id || req.session.user.isAdmin){ //TODO double check isAdmin
            //delete now
            clearFile(product.imageUrl);
            product.images.forEach(element =>{
                clearFile(element);
            })
            return Product.deleteOne({_id: productId})
        }
    })
    .then(result =>{
        res.redirect("/products")
    })
}

clearFile = (filePath) =>{
    fs.unlink(filePath, error =>{
        if(error != null){
            console.log(error);
        }
    })
}