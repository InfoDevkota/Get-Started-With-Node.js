const path = require("path");
const express = require("express");

const homePageRouter = require("./routes/homepage");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(homePageRouter);

app.get("*", (req,res,next)=>{
    res.render("404");
})

// app.get("/", (req,res,next) =>{
//     res.write("Hello World3!");
//     res.end();
// });

app.listen("4040");