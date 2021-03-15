const express = require('express');
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrdersByAdmin,
    updateOrdersByAdmin,
    deleteOrderByAdmin } = require('../controller/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, getMyOrders);

router.route('/admin/allorders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrdersByAdmin);
router.route('/admin/orders/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrdersByAdmin);
router.route('/admin/orders/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrderByAdmin);


module.exports = router;
