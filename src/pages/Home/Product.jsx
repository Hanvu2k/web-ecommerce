import React, { Fragment } from "react";
import { useDispatch } from "react-redux";

import { popActions } from "../../store/PopUp";
import { ProductItem } from "../../components/ProductItem";
import Popup from "../../components/Popup/Popup";

function Product({ productArr }) {
    const dispatch = useDispatch();

    // Dispatch showPopUp action
    const showPopUpHandler = (item) => {
        dispatch(popActions.showPopUp(item));
    };

    return (
        <div className="product-container my-6">
            <Popup />
            <div>
                <div className="product-info my-4">
                    <h4 className="product-sub-title">made the hard way</h4>
                    <h2 className="product-title">Top trending products</h2>
                </div>
                <div className="row product-items">
                    {productArr?.map((item) => {
                        return (
                            <Fragment key={item._id.$oid}>
                                <ProductItem
                                    img_url={item.img1}
                                    name={item.name}
                                    price={item.price}
                                    onClick={() => showPopUpHandler(item)}
                                    col="col-3"
                                />
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Product;
