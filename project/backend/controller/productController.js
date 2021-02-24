const Product = require('../models/product');

//Create New Product

exports.newProducts = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

}


exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'this route will save data in daa base'
    })
}