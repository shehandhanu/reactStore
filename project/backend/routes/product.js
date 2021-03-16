const express = require('express');

const router = express.Router();

const { getProducts,
    newProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require('../controller/productController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//Get All Products
router.route('/products').get(getProducts);
//Get One Product
router.route('/products/:id').get(getSingleProduct);

// Update Product and Delete (Admin Only)
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProducts);

module.exports = router;