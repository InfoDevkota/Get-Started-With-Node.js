module.exports = (req,res,next) => {
    if(!req.session.isLoggedIn){
        res.redirect("/login");
        return;
    } else {
        next();
    }
}