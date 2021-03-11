const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter Valid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [5, 'Your Password must be longer than 5 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//Encript password

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

//Compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JWT Token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//get passsword reser token
userSchema.methods.getResetPasswordToken = function () {

    //genarate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    console.log(resetToken);

    //has nad set reset passsword token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log(this.resetPasswordToken);

    //set token expire timestamp
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    // console.log(this.resetToken);

    return this.resetPasswordToken;

}

module.exports = mongoose.model('User', userSchema)