import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formatNumber } from "../../utils";
import { cartActions } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icon/vectorLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/icon/vectorRight.svg";

function ProductContent(props) {
    const { productInfo } = props;
    // State to track the quantity of the product
    const [quantitty, setQuantitty] = useState(1);
    // Get the current user information from the Redux store
    const userInfor = useSelector((state) => state.auth.currUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        const product = {
            productId: productInfo._id.$oid,
            name: productInfo.name,
            img: productInfo.img1,
            price: productInfo.price,
            quantitty: quantitty,
            total: productInfo.price * quantitty,
        };

        // Dispatch an action to add the product to the cart
        dispatch(
            cartActions.onAddToCart({
                userId: userInfor.id,
                product: product,
            })
        );
        setQuantitty(1); // Reset the quantity to 1
        navigate("/cart"); // Navigate to the cart page
    };

    // handle decre quantitty
    const decreBtnHandler = () => {
        if (quantitty === 1) {
            return;
        }

        setQuantitty((prevQuantitty) => prevQuantitty - 1);
    };

    // handle incre quantitty
    const increBtnHandler = () => {
        setQuantitty((prevQuantitty) => prevQuantitty + 1);
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
                            value={quantitty}
                            onChange={(event) =>
                                setQuantitty(event.target.value)
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
