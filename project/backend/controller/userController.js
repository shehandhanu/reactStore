const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

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

    res.status(201).json({
        success: true,
        user
    })

}