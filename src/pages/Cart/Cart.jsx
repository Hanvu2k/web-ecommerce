import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../css/cart.scss";
import { Banner } from "../../components/Banner";
import { BillTotal } from "../../components/BillTotal";
import routes from "../../configs/routes";
import { formatNumber } from "../../utils";
import { cartActions } from "../../store/cart";
import { ReactComponent as ArrowLeft } from "../../assets/icon/vectorLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon/vectorRight.svg";
import { ReactComponent as Trash } from "../../assets/icon/vectorTrash.svg";
import { ReactComponent as BackLeft } from "../../assets/icon/arrow-left-large.svg";
import { ReactComponent as BackRight } from "../../assets/icon/arrow-right-large.svg";

function Cart() {
    // Getting the authentication status
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // Getting the currUser
    const userInfor = useSelector((state) => state.auth.currUser);
    // Getting the products
    const products = useSelector((state) => state.cart.products);
    // Getting the total
    const total = useSelector((state) => state.cart.total);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Redirect to login page if the user is not authenticated
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, dispatch]);

    // Dispatch an action to decrement the quantity of a product in the cart
    const decreBtnHandler = (id) => {
        dispatch(
            cartActions.onUpdateToCart({
                userId: userInfor.id,
                productId: id,
                type: "DECREMENT",
            })
        );
    };

    // Dispatch an action to increment the quantity of a product in the cart
    const increBtnHandler = (id) => {
        dispatch(
            cartActions.onUpdateToCart({
                userId: userInfor.id,
                productId: id,
                type: "INCREMENT",
            })
        );
    };

    // Dispatch an action to delete a product from the cart
    const deleteProductHandler = (id) => {
        dispatch(
            cartActions.onDeleteCart({ userId: userInfor.id, productId: id })
        );
    };

    return (
        <div className="cart-container">
            <Banner title="cart" />
            <div className="cart-content my-6">
                <h3 className="cart-content-title my-4">Shopping cart</h3>
                <div className="row cart-content-detail">
                    <div className="cart-list-table col-8 pr-4">
                        <table>
                            <tbody className="table-product">
                                <tr className="product-properties">
                                    <td className="product-property">image</td>
                                    <td className="product-property">
                                        product
                                    </td>
                                    <td className="product-property">price</td>
                                    <td className="product-property">
                                        quantity
                                    </td>
                                    <td className="product-property">total</td>
                                    <td className="product-property">remove</td>
                                </tr>
                                {products?.map((item) => {
                                    return (
                                        <tr
                                            className="product-items "
                                            key={item.productId}
                                        >
                                            <td className="item-property">
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                />
                                            </td>
                                            <td className="item-property item-property-name">
                                                {item.name}
                                            </td>
                                            <td className="item-property">
                                                {formatNumber(item.price)} VND
                                            </td>
                                            <td className="item-property item-property-input">
                                                <button
                                                    className="btn-left"
                                                    onClick={() =>
                                                        decreBtnHandler(
                                                            item.productId
                                                        )
                                                    }
                                                >
                                                    <ArrowLeft />
                                                </button>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    value={item.quantitty}
                                                />
                                                <button
                                                    className="btn-right"
                                                    onClick={() =>
                                                        increBtnHandler(
                                                            item.productId
                                                        )
                                                    }
                                                >
                                                    <ArrowRight />
                                                </button>
                                            </td>
                                            <td className="item-property">
                                                {formatNumber(item.total)}
                                            </td>
                                            <td
                                                className="item-property"
                                                onClick={() =>
                                                    deleteProductHandler(
                                                        item.productId
                                                    )
                                                }
                                            >
                                                <Trash />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <BillTotal name="billTotal" btn={true} total={total} />
                </div>
                <div className="user-behavier col-8 d-flex justify-content-between align-items-center">
                    <div
                        className="shoping-behavier d-flex align-items-center"
                        onClick={() => navigate(routes.shop)}
                    >
                        <BackLeft />
                        <div className="ml-2">Continue shopping</div>
                    </div>
                    <div
                        className="checkout-behavier d-flex align-items-center"
                        onClick={() => navigate(routes.checkout)}
                    >
                        <div className="mr-2">Proceed to checkout</div>
                        <BackRight />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
