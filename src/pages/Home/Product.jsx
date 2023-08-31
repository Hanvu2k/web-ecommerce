import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { popActions } from "../../store/PopUpSilce";
import { ProductItem } from "../../components/ProductItem";
import apiConfig from "../../api/apiConfig";
import Popup from "../../components/Popup/Popup";

function Product() {
    const { products } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiConfig.getTrendingProduct());
    }, [dispatch]);

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
                    {products?.map((item) => {
                        return (
                            <Fragment key={item._id}>
                                <ProductItem
                                    img_url={item.img}
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
