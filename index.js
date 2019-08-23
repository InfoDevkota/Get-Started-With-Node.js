const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const homePageRouter = require("./routes/homepage");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const productRouter = require("./routes/products");

//const test = require("./test");

//console.log(test);
//test()
//test.hi();
//console.log(test.name);
//console.log(test.obj);

const app = express();

app.use(express.urlencoded());
app.use(
    session({
        secret: 'ThisisSecret'
    })
)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req,res,next) =>{
    if(req.session.isLoggedIn){
        req.god = "Yes";
    }
    next();
})

app.use(homePageRouter);
app.use(authRouter);
app.use(profileRouter);
app.use(productRouter);

app.get("*", (req,res,next)=>{
    res.render("404");
})

// app.get("/", (req,res,next) =>{
//     res.write("Hello World3!");
//     res.end();
// });

mongoose
    .connect('mongodb://localhost/start')
    .then(result =>{
        app.listen("4040");
        console.log("Server started at 4040");
    })
    .catch(error => console.log(error));