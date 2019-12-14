const Cart = require("../models/cart"); 
const User = require("../models/user");

const Product = require("../models/product");

module.exports.addToCart = (req,res,next) =>{
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    //console.log("Hello");

    if(req.session.user.cart){
        //console.log("Have cart")
        let product = {
            product: productId,
            quantity: quantity
        };
        User
        .findOne({email: req.session.user.email})
        .populate("cart")
        .then(user =>{
            //user.cart.products.push(product);
            return user.save()// TODO not needed
            .then(user =>{
                req.session.user = user;
                Cart.findOne({_id:user.cart._id})
                .then(cart =>{
                    cart.products.push(product);
                    //console.log(cart);
                    return cart.save()
                    .then(cart =>{
                        res.redirect("/");//TODO send to cart page
                    })
                })
            })
        })
    } else {
        //console.log("Have No cart");
        let cart = new Cart({
            products: [],
            cartBy: req.session.user
        });

        let product = {
            product: productId,
            quantity: quantity
        };

        cart.products.push(product);

        return cart.save()
        .then(cart =>{
            req.session.user.cart = cart;
            User.findOne({email: req.session.user.email})
            .then(user =>{
                user.cart = cart
                return user.save()
                .then(user =>{
                    req.session.user = user;
                    res.redirect("/cart");//TODO send to cart page
                })
            })
        })
    }
}

module.exports.getCart = (req,res,next) =>{
    Cart.findOne({cartBy:req.session.user})
    .populate("products.product")
    .then(cart =>{
        if(!cart){
            //No cart is available yet
            res.render("message", {
                message: "No Item in the Cart",
                content: "Start Browsing to find product to add to the cart."
            });
            return;
        }
        let products = cart.products;
        let newProducts = [];

        products.forEach(element => {
            if(element.product == null){
                //console.log("Product Dead");
                cart.products.pull(element);
                //products.pull(element);
            } else {
                newProducts.push(element)
                //console.log("Product Alive");
            }
        });
        return cart.save()
        .then(cart =>{
            res.render("cart", {
                cart: cart,
                products: newProducts
            });
        })
    })
}



//TODO better use API end point for add to card..
//Need help? use ajax..
//Refrence? follow this answer
//https://stackoverflow.com/questions/43523576/update-part-of-html-page-using-node-js-and-ejs by Cristian Colorado