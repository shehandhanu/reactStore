import React, { Fragment, useEffect } from 'react';

import '../App.css';
import CustomTitles from '../components/layout/CustomTitles';
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../action/productActions'
import { useAlert } from 'react-alert'

const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, products, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {

        dispatch(getProducts());

    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? <Loader />
                : (
                    <Fragment>
                        <CustomTitles title={'But Any thing You want'} />
                        <section>
                            <div className="d-flex justify-content-center container mt-5">
                                {products && products.map(product => (

                                    <Product key={product._id} product={product} />

                                ))}
                            </div>
                        </section>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default Home