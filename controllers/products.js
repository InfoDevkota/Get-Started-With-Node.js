const fs = require('fs');

const Product = require("../models/product");

module.exports.getAddProduct = (req,res,next) =>{
    res.render("addProduct");
}

module.exports.postAddProduct = (req,res,next) =>{
    const productTitle = req.body.title;

    const product = new Product({
        title: productTitle,
        postedBy: req.session.user,
        imageUrl: req.files[0].path
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
    .populate("postedBy")
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
    //console.log("on Detail Page");
    //console.log(productId);
    Product
    .findOne({_id: productId})
    .populate("postedBy")
    .then(product =>{
        let canEdit = false;

        if(req.session.user != null){
            if(product.postedBy._id == req.session.user._id){
                canEdit = true
            }
        }
        
        res.render("product-detail", {
            product,
            canEdit
        })
    })
}

module.exports.getEditProducts = (req,res,next) =>{
    const productId = req.params.productId;
    Product
    .findOne({_id: productId})
    .then(product =>{
        res.render("editProduct", {
            product: product
        })
    })
}

module.exports.postEditPost = (req,res,next) =>{
    const productId = req.params.productId;
    const newProductTitle = req.body.title;
    Product
    .findOne({_id: productId})
    .then(product =>{
        product.title = newProductTitle;
        return product.save()
    })
    .then(savedProduct =>{
        res.render("product-detail", {
            product: savedProduct,
            canEdit: true
        })
    })
}

module.exports.getDeleteProduct = (req,res,next) =>{
    const productId = req.params.productId;
    Product
    .findOne({_id: productId})
    .then(product =>{
        if(product.postedBy._id == req.session.user._id){
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