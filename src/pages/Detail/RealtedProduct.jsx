import React, { Fragment, useEffect, useState } from "react";

import ProductItem from "../../components/ProductItem/ProductItem";
import getProduct from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoProductActions } from "../../store/inforProduct";
import routes from "../../configs/routes";

function RealtedProduct(props) {
    const { productInfo } = props;
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the product data from the API
            const data = await getProduct();
            setProduct(data);
        };
        fetchData();
    }, []);

    // Filter the related products based on the category of the current product
    const relateProduct = product.filter((item) => {
        return (
            item.category === productInfo.category &&
            item.name !== productInfo.name
        );
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeToDetailPageHandler = (item) => {
        // Dispatch an action to store the selected product information in the Redux store
        dispatch(infoProductActions.setInfoProduct(item));
        // Navigate to the detail page of the selected product
        navigate(routes.detail.replace(":id", item._id.$oid));
    };

    return (
        <div className="related-product my-6">
            <h3>Related Products</h3>
            <div className="related-product-items row">
                {relateProduct.map((item) => {
                    return (
                        <Fragment key={item._id.$oid}>
                            <ProductItem
                                img_url={item.img1}
                                name={item.name}
                                price={item.price}
                                col="col-3"
                                onClick={() => changeToDetailPageHandler(item)}
                            />
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default RealtedProduct;
