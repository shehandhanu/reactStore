const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

//Create New Product

exports.newProducts = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

}


//get al products  =>/api/v1/products
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

//get single product =>/api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
}

//update product => /api/v1/product/:id 

exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product => /api/v1/product/:id

exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is Deleted Successfly'
    })

}