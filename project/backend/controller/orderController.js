const Order = require('../models/order');
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');

//create new order  => api/v1/order/new
exports.newOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxprice,
        shipingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({

        orderItems,
        shippingInfo,
        itemsPrice,
        taxprice,
        shipingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id

    })

    console.log(order);

    res.status(200).json({
        success: true,
        order
    })
}

//get single order => /api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
        return next(new ErrorHandler('No Order in that id number', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
}

//get single order loged in user => /api/v1/myorders
exports.getMyOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
        return next(new ErrorHandler('No Order in that id number', 404))
    }

    res.status(200).json({
        success: true,
        orders
    })
}

/////////////////////////////////////////
//admin getall orders => /api/v1/admin/orders/
exports.getAllOrdersByAdmin = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    if (!orders) {
        return next(new ErrorHandler('No Order in that id number', 404))
    }

    res.status(200).json({
        success: true,
        totalAmount,
        count: orders.length,
        orders

    })
}

//admin update orders => /api/v1/admin/orders/:id
exports.updateOrdersByAdmin = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('You Have Already Deliver This Order', 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.orderStatus,
        order.deliveredAt = Date.now();

    res.status(200).json({
        success: true,
        order,

    })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    if (product.stocks == 0) {
        retrun(new ErrorHandler('No Stock Awailable', 201));
    }

    product.stocks = product.stocks - quantity;

    await product.save({ validateBeforeSave: false });

}

// delete order loged in user => /api/v1/admin/order/:id
exports.deleteOrderByAdmin = async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No Order in that id number', 404))
    }

    await order.remove();

    res.status(200).json({
        success: true,
        order
    })
}