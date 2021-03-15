const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { send } = require('process');

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

//reset Password

exports.resetPassword = async (req, res, next) => {

    //hash url
    const resetPasswordToken = req.params.token;
    // crypto.createHash('sha256').update(req.params.token).digest('hex');

    console.log(resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    console.log(user);

    if (!user) {
        return next(new ErrorHandler('1 Password token invali or has expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('2 password dose not match', 400))
    }

    // setup new password 
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPAsswordExpires = undefined;

    await user.save();

    sendToken(user, 200, res);

}

//change password => apiv1/password/update      

exports.updatePassword = async (req, res, next) => {

    const user = await User.findById(req.user._id).select('+password');

    //check previes user password  
    const isMatch = await user.comparePassword(req.body.oldPassword);
    if (!isMatch) {
        return next(new ErrorHandler('Old password is incorrect', 400))
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);

}

//update user profile   => api/v1/user/update
exports.updateProfile = async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avater TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })

}

//get current user  => /api/v1/user

exports.getUserProfile = async (req, res, next) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        return next(new ErrorHandler(`User Cann't find ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
}

//Forgot Password => api/v1/password/forgot password
exports.forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User Not Found ', 404));
    }

    //get rest token  
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //create reset url 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is as follow : \n\n ${resetUrl}\n\n if you have not requested this email, then ignore it.`;

    // console.log('MSG ' + message);
    // console.log('URL ' + resetUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: 'React Js Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            messsage: `Email send to ${user.email}`
        })

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPAsswordExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));

    }


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

//Admin routeer
//////////////////////////////////////////////////////

//get all users   => /api/v1/admin/users  
exports.allUsers = async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
}

//get specific user detail => /api/v1/admin/user 
exports.getUserByAdmin = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User Can Not Find id : ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
}

//update user profile by admin   => api/v1/admin/user/update/id
exports.updateProfileBtAdmin = async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })

}

exports.deleteUserByAdmin = async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User Cann't find ${req.params.id}`))
    }

    // delete avater TODO

    await user.remove();

    res.status(200).json({
        success: true,
        user
    })
}