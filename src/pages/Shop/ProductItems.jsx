import React, { Fragment } from "react";
import { ProductItem } from "../../components/ProductItem";
import routes from "../../configs/routes";
import { useNavigate } from "react-router-dom";
import Spinning from "../../components/spining/Spinner";
import { useSelector } from "react-redux";

function ProductItems(props) {
    const { sortedProducts = [] } = props;
    const { isLoading } = useSelector((state) => state.product);

    const navigate = useNavigate();

    const changeToDetailPageHandler = (item) => {
        // Navigate to the detail page of the selected product
        navigate(routes?.detail.replace(":productId", item._id));
    };

    return (
        <Spinning spinning={isLoading}>
            <div className="row products-items my-4">
                {sortedProducts.length > 0 ? (
                    sortedProducts?.map((item) => (
                        <Fragment key={item._id}>
                            <ProductItem
                                col="col-4"
                                img_url={item.img}
                                name={item.name}
                                price={item.price}
                                onClick={() => changeToDetailPageHandler(item)}
                            />
                        </Fragment>
                    ))
                ) : (
                    <div className="no-product">No product found</div>
                )}
            </div>
        </Spinning>
    );
}

export default ProductItems;
