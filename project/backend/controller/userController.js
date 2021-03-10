const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

//Register User   => /api/v1/register
exports.registerUser = async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'public id ',
            url: 'Link Here'
        }
    })

    sendToken(user, 200, res)

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     success: true,
    //     token
    // })
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    //checkifemail and password enterd by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 4000))
    }

    //finding user in data bsae
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Email Or Password', 401));
    }

    //checks password is correct 
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email Or Password', 401));
    }

    sendToken(user, 200, res);

}


//logout user => /api/v1/logout
exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'logged out'
    })
}
