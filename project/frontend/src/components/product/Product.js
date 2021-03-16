import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className="card m-2 p-3 bg-white">
            <div className="about-product text-center mt-2"><img src={product.image[0].url} width="300" />
                <div>
                    <h4 className="mt-2">{product.name}</h4>
                    <h6 className="mt-0 text-black-50">{product.category}</h6>
                </div>
            </div>
            <div className="stats mt-2">
                <div className="d-flex justify-content-between p-price"><span>Vesa Mount Adapter</span><span>$5,999</span></div>
                <div className="d-flex justify-content-between p-price"><span>Pro stand</span><span>$999</span></div>
                <div className="d-flex justify-content-between p-price">Ratings</div>
            </div>
            <div className="d-flex justify-content-between total font-weight-bold mt-4"><span>Price</span><span>${product.price}</span></div>
            <Link to={`/products/${product._id}`} type="button" className="btn bg-warning mt-2"><i className="fa fa-cart-plus mr-2"></i> Add to cart</Link>
        </div>
    )
}

export default Product
