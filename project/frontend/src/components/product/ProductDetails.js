import React, { useEffect, Fragment } from 'react'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import '../../App.css'

import { getProductDetails, clearErrors } from '../../action/productActions'

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, product, error } = useSelector(state => state.productDetails);

    useEffect(() => {

        dispatch(getProductDetails(match.params.id));

        if (error) {
            alert.error(error);
        }
        console.log(dispatch);
    }, [dispatch, alert, error, match.params.id])

    return (

        <Fragment>
            {loading ? <Loader /> : (
                <section className="m-5">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">

                            <div id="mdb-lightbox-ui"></div>

                            <div className="mdb-lightbox">

                                <div className="row product-gallery mx-1">

                                    <div className="col-12 mb-0">
                                        <figure className="view overlay rounded z-depth-1 main-img">
                                            <a href="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15a.jpg"
                                                data-size="710x823">
                                                <img alt="ima" src={product.product.image[0].url} className="img-fluid z-depth-1" />
                                            </a>
                                        </figure>
                                        <figure className="view overlay rounded z-depth-1 productDetailsimg ">
                                            <a href="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"
                                                data-size="710x823">
                                                <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"
                                                    className="img-fluid z-depth-1" />
                                            </a>
                                        </figure>
                                        <figure className="view overlay rounded z-depth-1 productDetailsimg ">
                                            <a href="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg"
                                                data-size="710x823">
                                                <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg"
                                                    className="img-fluid z-depth-1" />
                                            </a>
                                        </figure>
                                        <figure className="view overlay rounded z-depth-1 productDetailsimg ">
                                            <a href="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14a.jpg"
                                                data-size="710x823">
                                                <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14a.jpg"
                                                    className="img-fluid z-depth-1" />
                                            </a>
                                        </figure>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"
                                                        className="img-fluid" />
                                                    <div className="mask rgba-white-slight"></div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13a.jpg"
                                                        className="img-fluid" />
                                                    <div className="mask rgba-white-slight"></div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14a.jpg"
                                                        className="img-fluid" />
                                                    <div className="mask rgba-white-slight"></div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="view overlay rounded z-depth-1 gallery-item">
                                                    <img alt="ima" src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15a.jpg"
                                                        className="img-fluid" />
                                                    <div className="mask rgba-white-slight"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-md-6">

                            {/* <h5>{product.product.name}</h5> */}
                            {/* <p className="mb-2  text-muted text-uppercase small">{product.product.category}</p> */}
                            <ul className="rating list-inline ">
                                <li className="list-inline-item">
                                    <i className="fas fa-star fa-sm text-primary"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fas fa-star fa-sm text-primary"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fas fa-star fa-sm text-primary"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fas fa-star fa-sm text-primary"></i>
                                </li>
                                <li className="list-inline-item">
                                    <i className="fas fa-star fa-sm text-primary"></i>
                                </li>
                                <li className="list-inline-item">
                                    {/* <i className="badge badge-primary">{product.product.rating}</i> */}
                                </li>
                            </ul>
                            {/* <p><span className="mr-1"><strong>${product.product.price}</strong></span></p> */}
                            <p className="pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit
                            error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. Distinctio,
                officia quis dolore quos sapiente tempore alias.</p>
                            <div className="table-responsive">
                                <table className="table table-sm table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Stocks</strong></th>
                                            {/* <td>{product.product.stocks}</td> */}
                                        </tr>
                                        <tr>
                                            <th className="pl-0 w-25" scope="row"><strong>Seller</strong></th>
                                            {/* <td>{product.product.seller}</td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="table-responsive mb-2">
                                <table className="table table-sm table-borderless">
                                    <tbody>
                                        <tr>
                                            <td className="pl-0 pb-0 w-25">Quantity</td>
                                            <td className="pb-0">Select size</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">
                                                <div className="def-number-input number-input safari_only mb-0">
                                                    <input className="" min="0" name="quantity" type="number" />
                                                </div>

                                            </td>
                                            <td>
                                                <div className="mt-1">
                                                    <div className="form-check form-check-inline pl-0">
                                                        <input type="radio" className="form-check-input" id="small" name="materialExampleRadios" />
                                                        <label className="form-check-label small text-uppercase card-link-secondary"
                                                        >Small</label>
                                                    </div>
                                                    <div className="form-check form-check-inline pl-0">
                                                        <input type="radio" className="form-check-input" id="medium" name="materialExampleRadios" />
                                                        <label className="form-check-label small text-uppercase card-link-secondary"
                                                        >Medium</label>
                                                    </div>
                                                    <div className="form-check form-check-inline pl-0">
                                                        <input type="radio" className="form-check-input" id="large" name="materialExampleRadios" />
                                                        <label className="form-check-label small text-uppercase card-link-secondary"
                                                        >Large</label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" className="btn btn-primary btn-md mr-1 mb-2">Buy now</button>
                            <button type="button" className="btn btn-light btn-md mr-1 mb-2"><i
                                className="fas fa-shopping-cart pr-2"></i>Add to cart</button>
                        </div>
                    </div>
                </section>
            )}
        </Fragment>

    )
}

export default ProductDetails
