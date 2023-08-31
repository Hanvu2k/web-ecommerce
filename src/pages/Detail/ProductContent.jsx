import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { formatNumber } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icon/vectorLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon/vectorRight.svg";
import { cartActions } from "../../store/cartSlice";
import apiConfig from "../../api/apiConfig";

function ProductContent(props) {
    const { productInfo } = props;
    // State to track the quantity of the product
    const [quantity, setQuantity] = useState(1);
    // Get the current user information from the Redux store

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        const newProduct = {
            productId: productInfo._id,
            quantity: quantity,
        };

        // Dispatch an action to add the product to the cart
        dispatch(apiConfig.addToCart(newProduct));
        dispatch(
            cartActions.onAddToCart({
                product: {
                    productId: productInfo._id,
                    name: productInfo.name,
                    img: productInfo.photos[0],
                    price: productInfo.price,
                    quantity: quantity,
                    total: productInfo.price * quantity,
                },
            })
        );

        setQuantity(1); // Reset the quantity to 1
        navigate("/cart"); // Navigate to the cart page
    };

    // handle decre quantitty
    const decreBtnHandler = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity((prevQuantity) => prevQuantity - 1);
    };

    // handle incre quantitty
    const increBtnHandler = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    return (
        <div className="detail-product-content col-6">
            <h2 className="product-name">{productInfo.name}</h2>
            <p className="product-price">
                {formatNumber(productInfo.price)} VND
            </p>
            <p className="product-description">{productInfo.short_desc}</p>
            <div className="product-category">
                <span className="mr-2">Category: </span>
                <span>{productInfo.category}</span>
            </div>
            <div className="product-sale d-flex align-items-center">
                <div className="product-quantity d-flex align-items-center">
                    <div className="product-quantity-title ">Quantity</div>
                    <div className="product-quantity-input">
                        <button
                            className="btn-left"
                            onClick={() => decreBtnHandler()}
                        >
                            <ArrowLeft />
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(event.target.value)
                            }
                            min={1}
                        />

                        <button
                            className="btn-right"
                            onClick={() => increBtnHandler()}
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </div>
                <div className="product-btn" onClick={addToCartHandler}>
                    <button className="btn-primary btn-italic btn-product">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductContent;
