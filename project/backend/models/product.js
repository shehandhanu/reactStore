const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        require: [true, 'Please Enter Name']
    },
    price: {
        type: Number,
        default: 0
    },
    rating: {
        type: 'number',
        default: 0.0
    },
    image: [
        {
            public_id: {
                type: 'string',
                require
            }, url: {
                type: 'string',
            }
        }
    ],
    category: {
        type: 'string',
        // enum: [''] This will show all categories
    },
    seller: {
        type: 'string',
    },
    stocks: {
        type: 'string',
    },
    numOfReviews: {
        type: 'number',
    },
    reviews: [
        {
            name: {
                type: 'string',
            },
            rating: {
                type: 'number',
            },
            comment: {
                type: 'string',
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);