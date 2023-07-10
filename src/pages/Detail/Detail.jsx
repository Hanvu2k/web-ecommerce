import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

import "../../css/detail.scss";
import ProductDescription from "./ProductDescription";
import RealtedProduct from "./RealtedProduct";
import ProductContent from "./ProductContent";
import ProductImgs from "./ProductImgs";
import routes from "../../configs/routes";

function Detail() {
    // Retrieve product information from the Redux store
    const productInfo = useSelector((state) => state.detailProduct.infoProduct);
    // Get the current route match
    const path = useMatch(routes.detail);

    useEffect(() => {
        // Scroll to the top of the page when the path changes
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <div className="detail-container">
            <div className="detail-product-info my-6 row">
                <ProductImgs productInfo={productInfo} />
                <ProductContent productInfo={productInfo} />
            </div>
            <ProductDescription productInfo={productInfo} />
            <RealtedProduct productInfo={productInfo} />
        </div>
    );
}

export default Detail;
