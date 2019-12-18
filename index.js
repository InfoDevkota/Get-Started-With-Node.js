const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");

const homePageRouter = require("./routes/homepage");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");

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

const fileStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
        callback(null, "images");
    },
    filename: (req,file,callback) =>{
        callback(null, new Date().toISOString() + "-" + file.originalname);
    }
})

const fileFilter = (req,file,callback) =>{
    if(
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ){
        callback(null, true);
    }
    else {
        callback(null, flase);
    }
};

// app.use(multer({
//     storage: fileStorage,
//     fileFilter: fileFilter})
//     .single("image"))

app.use(multer({
        storage: fileStorage,
        fileFilter: fileFilter})
        .array("images",5));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/static", express.static(path.join(__dirname, 'static')));

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
app.use(categoryRouter);
app.use(cartRouter)

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