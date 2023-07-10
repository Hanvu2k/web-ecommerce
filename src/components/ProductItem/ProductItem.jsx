import React from "react";

import "../../css/ProductItem.scss"; // Importing the ProductItem styling
import { formatNumber } from "../../utils"; // Importing the formatNumber utility function

function ProductItem({ col, img_url, name, price, onClick = () => {} }) {
    return (
        <div className={`${col} product-item my-2`} onClick={onClick}>
            <div className="product-item-content">
                <div className="item-img">
                    <img className="item-img-link" src={img_url} alt={name} />
                </div>
                <h3 className="item-name">{name}</h3>
                <div className="item-price">{formatNumber(price)} VND</div>
            </div>
        </div>
    );
}

export default ProductItem;
