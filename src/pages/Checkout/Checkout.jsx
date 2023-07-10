import React from "react";

import { Banner } from "../../components/Banner";
import { BillTotal } from "../../components/BillTotal";
import "../../css/checkout.scss";
import { useSelector } from "react-redux";

const Checkout = () => {
    // Getting the total
    const total = useSelector((state) => state.cart.total);

    // Getting the procduct
    const procduct = useSelector((state) => state.cart.products);

    return (
        <div className="checkout-container">
            <Banner title="checkout" path="home/cart/" />

            <div className="checkout-content  my-6">
                <h3 className="Checkout-title my-4">Billing details</h3>
                <div className="checkout-content-detail row">
                    <div className="Checkout-form col-8 pr-4">
                        <form>
                            <div className="form-control">
                                <label htmlFor="fullName">Full name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Full Name Here!"
                                    id="fullName"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">email:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email Here!"
                                    id="email"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="phoneNumber">
                                    phone number:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Phone Number Here!"
                                    id="phoneNumber"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Address Here!"
                                    id="address"
                                />
                            </div>
                            <div>
                                <button className="btn-primary btn-italic">
                                    Place order
                                </button>
                            </div>
                        </form>
                    </div>

                    <BillTotal
                        name="Your order"
                        total={total}
                        procduct={procduct}
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
