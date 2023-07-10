import React, { Fragment } from "react";

function ShopSidebar(props) {
    const {
        showAllProductsHandler,
        sortedProducts,
        selectedOption,
        softProductHandler,
    } = props;

    // Shop sibar dâta
    const categoryAll = [
        {
            id: "1",
            type: "iphone & mac",
            product: ["iphone", "ipad", "macbook"],
        },
        {
            id: "2",
            type: "wireless",
            product: ["airpod", "watch"],
        },
        {
            id: "3",
            type: "other",
            product: ["mouse", "keyboard", "other"],
        },
    ];

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">categories</h3>
            <div className="sidebar-product">Apple</div>
            <div
                className={`sidebar-chosen ${sortedProducts ? "" : "actived"} `}
                onClick={showAllProductsHandler}
            >
                All
            </div>
            {categoryAll.map((item) => {
                return (
                    <div key={item.id} className="product-type">
                        <h4 className="product-type-name">{item.type}</h4>
                        <ul className="product-type-items">
                            {item.product.map((item, index) => (
                                <Fragment key={index}>
                                    <li
                                        className={`product-type-item ${
                                            selectedOption === item
                                                ? "actived"
                                                : ""
                                        }`}
                                        onClick={() => softProductHandler(item)}
                                    >
                                        {item}
                                    </li>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default ShopSidebar;
