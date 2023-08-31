import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMatch, useParams } from "react-router-dom";

import "../../css/detail.scss";
import ProductDescription from "./ProductDescription";
import RealtedProduct from "./RealtedProduct";
import ProductContent from "./ProductContent";
import ProductImgs from "./ProductImgs";
import routes from "../../configs/routes";
import apiConfig from "../../api/apiConfig";
import Spinning from "../../components/spining/Spinner";

function Detail() {
    // Retrieve product information from the Redux store
    const { product, isLoading } = useSelector((state) => state.product);

    // Get the current route match
    const path = useMatch(routes.detail);
    const dispatch = useDispatch();
    const { productId } = useParams();

    useEffect(() => {
        dispatch(apiConfig.getProductById(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        // Scroll to the top of the page when the path changes
        window.scrollTo(0, 0);
    }, [path]);

    return (
        <Spinning spinning={isLoading}>
            <div className="detail-container">
                <div className="detail-product-info my-6 row">
                    <ProductImgs productInfo={product} />
                    <ProductContent productInfo={product} />
                </div>
                <ProductDescription productInfo={product} />
                <RealtedProduct productInfo={product} />
            </div>
        </Spinning>
    );
}

export default Detail;
