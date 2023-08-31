import React, { Fragment } from "react";

import { formatText } from "../../utils/"; // import formatText util

function ProductDescription(props) {
    const { productInfo = {} } = props;

    return (
        <div className="product-description my-6">
            <div className="product-description-btn">
                <button className="btn-primary btn-italic">Description</button>
            </div>
            <h3 className="product-description-title">product description</h3>
            <div className="product-description-content">
                <div className="product-description-property">
                    {formatText(productInfo?.long_desc)?.[0]}
                </div>
                <ul className="product-description-list">
                    {formatText(productInfo?.long_desc)?.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <li className="list-item">
                                    {item?.includes("-") ? item : ` - ${item}`}
                                </li>
                            </Fragment>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ProductDescription;
