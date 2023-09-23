import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../css/cart.scss";
import { Banner } from "../../components/Banner";
import { BillTotal } from "../../components/BillTotal";
import routes from "../../configs/routes";
import { formatNumber } from "../../utils";
import { cartActions } from "../../store/cartSlice";
import { ReactComponent as ArrowLeft } from "../../assets/icon/vectorLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon/vectorRight.svg";
import { ReactComponent as Trash } from "../../assets/icon/vectorTrash.svg";
import { ReactComponent as BackLeft } from "../../assets/icon/arrow-left-large.svg";
import { ReactComponent as BackRight } from "../../assets/icon/arrow-right-large.svg";
import apiConfig from "../../api/apiConfig";

function Cart() {
    // Getting the authentication status
    const { token } = useSelector((state) => state.user);
    // Getting the product.updateCart
    const products = useSelector((state) => state.cart.carts?.products);
    const { total } = useSelector((state) => state.cart?.carts);
    const cart = useSelector((state) => state.cart.carts);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Redirect to login page if the user is not authenticated
        if (!token) {
            navigate(routes?.login);
        }
    }, [token, navigate, dispatch]);

    // Dispatch an action to decrement the quantity of a product in the cart
    const decreBtnHandler = async (id, quantity) => {
        if (quantity === 1) {
            const confirmed = window.confirm(
                "Do you want to remove this product from the cart?"
            );

            if (confirmed) {
                // Remove the product from the cart
                dispatch(apiConfig.deleteProductInCart(id));
                dispatch(cartActions.onDeleteCart({ productId: id }));
                return;
            }

            return;
        }

        await dispatch(
            cartActions.onUpdateToCart({
                productId: id,
                type: "DECREMENT",
            })
        );

        const index = cart.products.findIndex(
            (product) => product.productId === id
        );
        if (index !== -1) {
            const updatedProduct = [...cart.products];
            updatedProduct[index] = {
                ...updatedProduct[index],
                quantity: updatedProduct[index].quantity - 1,
            };

            let updateCart = {
                ...cart,
                products: updatedProduct,
                total: cart.total - updatedProduct[index].price,
            };
            dispatch(apiConfig.updateCart(updateCart));
        }
    };

    // Dispatch an action to increment the quantity of a product in the cart
    const increBtnHandler = (id) => {
        dispatch(
            cartActions.onUpdateToCart({
                productId: id,
                type: "INCREMENT",
            })
        );

        const index = cart.products.findIndex(
            (product) => product.productId === id
        );
        if (index !== -1) {
            const updatedProduct = [...cart.products];
            updatedProduct[index] = {
                ...updatedProduct[index],
                quantity: updatedProduct[index].quantity + 1,
            };

            let updateCart = {
                ...cart,
                products: updatedProduct,
                total: cart.total + updatedProduct[index].price,
            };

            dispatch(apiConfig.updateCart(updateCart));
        }
    };

    // Dispatch an action to delete a product from the cart
    const deleteProductHandler = (id) => {
        const confirmed = window.confirm(
            "Do you want to remove this product from the cart?"
        );

        if (confirmed) {
            // Remove the product from the cart
            dispatch(cartActions.onDeleteCart({ productId: id }));
            dispatch(apiConfig.deleteProductInCart(id));
        }
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
                                                            item.productId,
                                                            item.quantity
                                                        )
                                                    }
                                                >
                                                    <ArrowLeft />
                                                </button>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    value={item.quantity}
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
                        {products.length === 0 && (
                            <div className="no-product">No product</div>
                        )}
                    </div>

                    <BillTotal name="billTotal" btn={true} total={total} />
                </div>
                <div className="user-behavier col-8 d-flex justify-content-between align-items-center">
                    <div
                        className="shoping-behavier d-flex align-items-center"
                        onClick={() => navigate(routes?.shop)}
                    >
                        <BackLeft />
                        <div className="ml-2">Continue shopping</div>
                    </div>
                    <div
                        className="checkout-behavier d-flex align-items-center"
                        onClick={() => navigate(routes?.checkout)}
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
