module.exports.getProfile = (req,res,next) =>{
    ////
    //some login here
    //
    let name ;

    let loggedIn = req.session.isLoggedIn;
    if(loggedIn){
        name = req.session.user.name;
    }
    let god = req.god || "Ram";

    res.render("profile", {
        loggedIn: loggedIn,
        name : name,
        god: god
    });
}