
const { expressjwt } = require("express-jwt");

exports.requireAuth = expressjwt({
    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
});


exports.isAuth = (req, res, next) => {
    if(req.auth.role == 1) return next();
    let user = req.profile && req.auth._id == req.profile._id;
    if(!user) res.status(403).json({error: "Access denied!"});
    next();
}

exports.isAdmin = (req, res, next) => {
    let user = req.auth;
    if(user.role === 0) res.status(403).json({error: "Admin required, Access denied!"});
    next();
}

