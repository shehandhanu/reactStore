const express = require('express');

const router = express.Router();

const { getProducts,
    newProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require('../controller/productController');


//Get All Products
router.route('/products').get(getProducts);
//Get One Product
router.route('/products/:id').get(getSingleProduct);

// Update Product and Delete (Admin Only)
router.route('/admin/products/:id')
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/admin/products/new').post(newProducts);

module.exports = router;