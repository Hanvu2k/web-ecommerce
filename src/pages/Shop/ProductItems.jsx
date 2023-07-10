import React, { Fragment } from "react";
import { ProductItem } from "../../components/ProductItem";
import { infoProductActions } from "../../store/inforProduct";
import routes from "../../configs/routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProductItems(props) {
    const { category = [], sortedProducts = [] } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeToDetailPageHandler = (item) => {
        // Dispatch an action to set the information of the selected product
        dispatch(infoProductActions.setInfoProduct(item));
        // Navigate to the detail page of the selected product
        navigate(routes.detail.replace(":id", item._id.$oid));
    };

    return (
        <div className="row products-items my-4">
            {sortedProducts
                ? sortedProducts?.map((item) => (
                      <Fragment key={item._id.$oid}>
                          <ProductItem
                              col="col-4"
                              img_url={item.img1}
                              name={item.name}
                              price={item.price}
                              onClick={() => changeToDetailPageHandler(item)}
                          />
                      </Fragment>
                  ))
                : category?.map((item) => (
                      <Fragment key={item._id.$oid}>
                          <ProductItem
                              col="col-4"
                              img_url={item.img1}
                              name={item.name}
                              price={item.price}
                              onClick={() => changeToDetailPageHandler(item)}
                          />
                      </Fragment>
                  ))}
        </div>
    );
}

export default ProductItems;
