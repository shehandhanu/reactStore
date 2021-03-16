import React, { Fragment } from 'react'

import '../../App.css'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top ">

                <div className="navbar-brand mr-1 pt-1 pb-1" href="index.html">React Store</div>

                <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">

                    <ul className="navbar-nav ml-auto ml-md-0">
                        <li>
                            <div className="d-none d-md-inline-block form-inline ml-auto mr-2 mr-md-3 my-2 my-md-0">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search Items" aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary btn-outline-light" type="button">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow mx-1">
                            <div className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="badge">Cart</span>
                                <i className="fas fa-cart-arrow-down fa-fw"></i>
                                <span className="badge badge-danger ml-1">7</span>
                            </div>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown">
                                <div className="dropdown-item" href="#">Action</div>
                                <div className="dropdown-item" href="#">Another action</div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" href="#">Something else here</div>
                            </div>
                        </li>
                        <li className="nav-item dropdown no-arrow">
                            <div className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="badge">User</span>
                                <i className="fas fa-user fa-fw"></i>
                            </div>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <div className="dropdown-item" href="#">Settings</div>
                                <div className="dropdown-item" href="#">Activity Log</div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

        </Fragment >
    )
}

export default Header
