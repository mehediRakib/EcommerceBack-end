import React from 'react';
import {Link} from "react-router-dom";
import productStore from "../../store/ProductStore.js";

const Footer = () => {
    return (
        <div>
            <div className="section-bottom shadow-sm bg-white">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 className="bodyMedium">legals</h1>
                            <p className="my-2"><Link to="/" className="nav-link">About</Link> </p>
                            <p className="my-2"><Link to="/" className="nav-link">Refund Policy</Link> </p>
                            <p className="my-2"><Link to="/" className="nav-link">Terms</Link> </p>
                        </div>

                        <div className="col-md-4">
                            <h1 className="bodyMedium">Information</h1>
                            <p className="my-2"><Link to="/" className="nav-link">How to Buy</Link> </p>
                            <p className="my-2"><Link to="/" className="nav-link">Contact</Link> </p>
                            <p className="my-2"><Link to="/" className="nav-link">Complain</Link> </p>
                        </div>

                        <div className="col-md-4">
                            <h1 className="bodyMedium">About</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                            <img className="w-75" src="https://www.uiu.ac.bd/wp-content/uploads/2021/02/Card-Logo-Pay-With-01-1.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-3 text-center">
                <p className="text-white bodySmal">All Rights Reserved </p>
            </div>
        </div>
    );
};

export default Footer;