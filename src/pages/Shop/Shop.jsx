import React, { useEffect, useState } from "react";

import "../../css/shop.scss";
import getProduct from "../../api/index";
import { Banner } from "../../components/Banner";
import ShopSidebar from "./ShopSidebar";
import SearchProduct from "./SearchProduct";
import ProductItems from "./ProductItems";

function Shop() {
    const [category, setCategory] = useState([]);
    const [sortedProducts, setSortedProducts] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        // Fetch the product data from the API
        const fetchData = async () => {
            try {
                const data = await getProduct();
                setCategory(data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Reset the sorting and show all products
    const showAllProductsHandler = () => {
        setSortedProducts(null);
        setSelectedOption("");
    };

    // Sort the products based on the selected category
    const softProductHandler = (name) => {
        const filteredProducts = category?.filter(
            (item) => item.category === name
        );
        setSelectedOption(name);
        setSortedProducts(filteredProducts);
    };

    // Filter the products based on the search query
    const searchProduct = (searchQuery) => {
        const filteredProducts = category.filter((item) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setSortedProducts(filteredProducts);
    };

    return (
        <div className="shop-container">
            <Banner title="shop" />

            <div className="d-flex shop-content my-6">
                <ShopSidebar
                    softProductHandler={softProductHandler}
                    showAllProductsHandler={showAllProductsHandler}
                    sortedProducts={sortedProducts}
                    selectedOption={selectedOption}
                />

                <div className="products-container">
                    <SearchProduct
                        searchProduct={searchProduct}
                        softProductHandler={softProductHandler}
                        selectedOption={selectedOption || ""}
                    />
                    <ProductItems
                        category={category}
                        sortedProducts={sortedProducts}
                    />
                </div>
            </div>
        </div>
    );
}

export default Shop;
