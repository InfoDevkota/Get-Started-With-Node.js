let names = ["Sagar", "Amrit", "Suman"];

module.exports.getHomePage = (req,res,next) =>{
    // res.write("Hello World5!");
    // res.end();

    res.render("homepage", {
        name: "Sagar",
        names: names
    });
}

module.exports.getLogin = (req,res,next) =>{
    res.render("login");
}