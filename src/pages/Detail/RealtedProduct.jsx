import React, { Fragment, useEffect } from "react";

import ProductItem from "../../components/ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { infoProductActions } from "../../store/inforProduct";
import routes from "../../configs/routes";
import apiConfig from "../../api/apiConfig";

function RealtedProduct(props) {
    const { relatedProducts } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productId } = useParams();

    useEffect(() => {
        dispatch(apiConfig.getRelatedProduct(productId));
    }, [dispatch, productId]);

    const changeToDetailPageHandler = (item) => {
        // Dispatch an action to store the selected product information in the Redux store
        dispatch(infoProductActions.setInfoProduct(item));
        // Navigate to the detail page of the selected product
        navigate(routes?.detail.replace(":productId", item._id));
    };

    return (
        <div className="related-product my-6">
            <h3>Related Products</h3>
            <div className="related-product-items row">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item) => {
                        return (
                            <Fragment key={item._id}>
                                <ProductItem
                                    img_url={item.img}
                                    name={item.name}
                                    price={item.price}
                                    col="col-3"
                                    onClick={() =>
                                        changeToDetailPageHandler(item)
                                    }
                                />
                            </Fragment>
                        );
                    })
                ) : (
                    <p className="no-product">No product found</p>
                )}
            </div>
        </div>
    );
}

export default RealtedProduct;
