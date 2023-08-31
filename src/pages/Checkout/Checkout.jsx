import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";

import { Banner } from "../../components/Banner";
import { BillTotal } from "../../components/BillTotal";
import "../../css/checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import routes from "../../configs/routes";
import Spinner from "../../components/spining/Spinner";

const Checkout = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
    });
    // Getting the total
    const { total, products } = useSelector((state) => state.cart.carts);
    const { isLoading } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderHandler = async (e) => {
        e.preventDefault();

        if (
            !userInfo.address ||
            !userInfo.phoneNumber ||
            !userInfo.name ||
            !userInfo.email
        )
            return alert("Please enter valid values");

        if (products.length === 0) {
            alert("You don't have any products");
            return;
        }

        await dispatch(apiConfig.createOrder(userInfo));

        await dispatch(apiConfig.getCart());

        navigate(routes.history);
        setUserInfo({
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
        });
    };

    return (
        <Spinner spinning={isLoading}>
            <div className="checkout-container">
                <Banner title="checkout" path="home/cart/" />

                <div className="checkout-content  my-6">
                    <h3 className="Checkout-title my-4">Billing details</h3>
                    <div className="checkout-content-detail row">
                        <div className="Checkout-form col-8 pr-4">
                            <form onSubmit={orderHandler}>
                                <div className="form-control">
                                    <label htmlFor="fullName">Full name:</label>
                                    <DebounceInput
                                        minLength={1}
                                        debounceTimeout={200}
                                        type="text"
                                        placeholder="Enter Your Full Name Here!"
                                        id="fullName"
                                        name="fullName"
                                        value={userInfo.name}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="email">email:</label>
                                    <DebounceInput
                                        minLength={1}
                                        debounceTimeout={200}
                                        type="text"
                                        placeholder="Enter Your Email Here!"
                                        id="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="phoneNumber">
                                        phone number:
                                    </label>
                                    <DebounceInput
                                        minLength={1}
                                        debounceTimeout={200}
                                        type="text"
                                        placeholder="Enter Your Phone Number Here!"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={userInfo.phoneNumber}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="address">Address</label>
                                    <DebounceInput
                                        minLength={1}
                                        debounceTimeout={200}
                                        type="text"
                                        placeholder="Enter Your Address Here!"
                                        id="address"
                                        name="address"
                                        value={userInfo.address}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="btn-primary btn-italic"
                                    >
                                        Place order
                                    </button>
                                </div>
                            </form>
                        </div>

                        <BillTotal
                            name="Your order"
                            total={total}
                            products={products}
                        />
                    </div>
                </div>
            </div>
        </Spinner>
    );
};

export default Checkout;
