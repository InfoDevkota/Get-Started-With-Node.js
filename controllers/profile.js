const User = require("../models/user");
const Product = require("../models/product");

module.exports.getMyProfile = (req,res,next) =>{
    Product.find({postedBy: req.session.user._id})
    .populate("postedBy category")
    .then(products =>{
        User.findOne({_id: req.session.user._id})
        .then((user) =>{
            res.render("profile", {
                user: user,
                products: products
            })
        });
    })
}

module.exports.getProfile = (req,res,next) =>{
    const userId = req.params.userId;

    Product.find({postedBy: userId})
    .populate("postedBy category")
    .then(products =>{
        User.findOne({_id: userId})
        .then((user) =>{
            res.render("profile", {
                user: user,
                products: products
            })
        });
    })
}