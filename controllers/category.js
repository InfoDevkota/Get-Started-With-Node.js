const fs = require('fs');

const Category = require("../models/category");

module.exports.getAddCategory = (req,res,next) =>{
    res.render("addCategory");
}

module.exports.postAddCategory = (req,res,next) =>{
    const categoryTitle = req.body.title;

    const category = new Category({
        title: categoryTitle
    })

    category
    .save()
    .then(category =>{
        res.redirect("/");
    })
    //res.redirect("/");
}

// module.exports.putEditProduct = (req,res,next) =>{

// }

module.exports.getCategories = (req,res,next) =>{
    Category.find()
    .then(categories =>{
        res.render("products", {
            categories: categories
        })
    })
}
