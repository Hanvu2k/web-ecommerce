import React from "react";
import { useNavigate } from "react-router-dom";

import product_1 from "../../assets/imgs/product_1.png";
import product_2 from "../../assets/imgs/product_2.png";
import product_3 from "../../assets/imgs/product_3.png";
import product_4 from "../../assets/imgs/product_4.png";
import product_5 from "../../assets/imgs/product_5.png";

function Categories() {
    const navigate = useNavigate();

    const navigateToShopHandler = () => {
        navigate("/shop");
    };

    return (
        <div className="category-container my-6">
            <div className="category-info py-4">
                <h4 className="category-sub-title">
                    Carefully created collections
                </h4>
                <h2 className="category-title">Borowse our categories</h2>
            </div>
            <div className="category-items  ">
                <div className="row  category-item-top my-2">
                    <div
                        className="col-6 category-item-img"
                        onClick={navigateToShopHandler}
                    >
                        <img
                            className="item-img-link"
                            src={product_1}
                            alt="product"
                        />
                    </div>
                    <div
                        className="col-6 category-item-img"
                        onClick={navigateToShopHandler}
                    >
                        <img
                            className="item-img-link"
                            src={product_2}
                            alt="product"
                        />
                    </div>
                </div>
                <div className="row category-item-bot">
                    <div
                        className="col-4 category-item-img"
                        onClick={navigateToShopHandler}
                    >
                        <img
                            className="item-img-link"
                            src={product_3}
                            alt="product"
                        />
                    </div>
                    <div
                        className="col-4 category-item-img"
                        onClick={navigateToShopHandler}
                    >
                        <img
                            className="item-img-link"
                            src={product_4}
                            alt="product"
                        />
                    </div>
                    <div
                        className="col-4 category-item-img"
                        onClick={navigateToShopHandler}
                    >
                        <img
                            className="item-img-link"
                            src={product_5}
                            alt="product"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
