import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../css/popup.scss"; // Importing the popup styling
import { popActions } from "../../store/PopUp"; // Importing the popActions from the PopUp store
import { infoProductActions } from "../../store/inforProduct"; // Importing the infoProductActions from the inforProduct store
import { formatNumber } from "../../utils"; // Importing the formatNumber utility function
import routes from "../../configs/routes"; // Importing the routes configuration
import { ReactComponent as CartIcon } from "../../assets/icon/Cart.svg";
import { ReactComponent as Close } from "../../assets/icon/Component 1.svg";

function Popup() {
    // Getting the show/hide status of the popup
    const show = useSelector((state) => state.popup.isShow);
    // Getting the product information
    const productInfo = useSelector((state) => state.popup.infoProduct);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Dispatching the hidePopUp action to hide the popup
    const hidePopupHandler = () => {
        dispatch(popActions.hidePopUp());
    };

    const changeToDetailPageHandler = (item) => {
        // Dispatching the setInfoProduct action to set the selected product information in the Redux store
        dispatch(infoProductActions.setInfoProduct(item));
        // Dispatching the hidePopUp action to hide the popup
        dispatch(popActions.hidePopUp());
        // Navigating to the detail page of the selected product
        navigate(routes.detail.replace(":id", item._id.$oid));
    };

    return (
        <>
            {show && (
                <div className="popup-wrapper">
                    <div className="popup container row">
                        <div className="col-6 popup-img">
                            <img
                                className="popup-img-link"
                                src={productInfo.img1}
                                alt="product"
                            />
                        </div>
                        <div className="col-6 popup-content">
                            <div className="icon" onClick={hidePopupHandler}>
                                <Close />
                            </div>
                            <h2 className="product-name">{productInfo.name}</h2>
                            <div className="product-price">
                                {formatNumber(productInfo.price)} VND
                            </div>
                            <p className="product-description">
                                {productInfo.short_desc}
                            </p>
                            <div className="btn-detail my-4">
                                <button
                                    className="btn-primary btn-italic d-flex align-items-center"
                                    onClick={() =>
                                        changeToDetailPageHandler(productInfo)
                                    }
                                >
                                    <span className="mr-2">
                                        <CartIcon />
                                    </span>
                                    View details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;
