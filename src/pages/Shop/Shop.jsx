import React, { useEffect, useState } from "react";

import "../../css/shop.scss";
import { Banner } from "../../components/Banner";
import ShopSidebar from "./ShopSidebar";
import SearchProduct from "./SearchProduct";
import ProductItems from "./ProductItems";
import apiConfig from "../../api/apiConfig";
import { useDispatch, useSelector } from "react-redux";

function Shop() {
    const [selectedOption, setSelectedOption] = useState(null);
    const { products } = useSelector((state) => state.product);
    const [searchKey, setSearchKey] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch the product data from the API
        dispatch(apiConfig.getAllProduct());
    }, [dispatch]);

    // Sort the products based on the selected category
    const softProductHandler = (name) => {
        dispatch(apiConfig.getProductsByCategory(name));
        setSelectedOption(name);
        searchKey && setSearchKey("");
    };

    const searchProductHandler = (searchQuery) => {
        setSearchKey(searchQuery);
        dispatch(apiConfig.searchProductByKey(searchQuery));
    };

    return (
        <div className="shop-container">
            <Banner title="shop" />

            <div className="d-flex shop-content my-6">
                <ShopSidebar
                    softProductHandler={softProductHandler}
                    sortedProducts={products}
                    selectedOption={selectedOption}
                />

                <div className="products-container">
                    <SearchProduct
                        searchKey={searchKey}
                        onSearch={searchProductHandler}
                        softProductHandler={softProductHandler}
                        selectedOption={selectedOption || "All"}
                    />
                    <ProductItems sortedProducts={products} />
                </div>
            </div>
        </div>
    );
}

export default Shop;
