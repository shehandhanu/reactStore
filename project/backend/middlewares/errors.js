const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errmsg: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message;

        //Wrong id object 
        // if (err.name == 'CastError') {
        //     const message = `Resourse not found invalid : ${err.path}`;
        //     error = new ErrorHandler(message, 400);
        // }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })

    }

}