const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports.getSignUp = (req,res,next) => {
    res.render("signup");
}

module.exports.postSingUp = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //TODO
    //we need to validate if the email is already used.
    bcrypt
        .hash(password, 12)
        .then(hassedPassword => {
            let newUser = new User({
                name: name,
                email: email,
                password: hassedPassword
            })
            return newUser.save();
        })
        .then(newUser =>{
            console.log("User Created");
            res.redirect("/");
        })
    //res.redirect("/");
}

module.exports.getLogin = (req,res,next) => {
    res.render("login");
}

module.exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
    .then(user =>{
        if(user == null){
            console.log("No User found");
            res.redirect("/login");
        } else {
            bcrypt
            .compare(password, user.password)
            .then(isMatched =>{
                if(isMatched){
                    //set this user in session;
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    res.redirect("/");
                } else {
                    res.redirect("/login");
                }
            })
        }
    })
}