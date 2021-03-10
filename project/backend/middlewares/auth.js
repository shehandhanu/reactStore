//check user is authenticte or not
const User = require('../models/user')

const jwt = require("jsonwebtoken");
const user = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login First', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id);

    next();

}

//handling roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allow to access this resourse`, 403)
            )
        }
        next();
    }
}