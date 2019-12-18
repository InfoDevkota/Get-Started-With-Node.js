let names = ["Sagar", "Amrit", "Suman"];

const Product = require("../models/product");

module.exports.getHomePage = (req,res,next) =>{
    // res.write("Hello World5!");
    // res.end();

    let isLogin = req.session.isLoggedIn;

    Product.find()
    .populate("postedBy category")
    .then(products =>{
        res.render("homepage", {
            name: "Sagar",
            names: names,
            products: products,
            isLogin: isLogin
        });
    })
}

module.exports.getLogin = (req,res,next) =>{
    res.render("login");
}