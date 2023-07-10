import React, { useEffect, useState } from "react";

import "../../css/home.scss";
import HomBanner from "./HomBanner";
import Categories from "./Categories";
import Product from "./Product";
import OtherInfo from "./OtherInfo";
import getProduct from "../../api/index";
import { MessageBox } from "../../components/MessageBox";

function Home() {
    const [productArr, setProductArr] = useState([]);

    useEffect(() => {
        // Fetch the product data from the API
        const fetchData = async () => {
            const data = await getProduct();
            setProductArr(data);
        };
        fetchData();
    }, []);

    return (
        <div className="home-container">
            <HomBanner />
            <Categories />
            <Product productArr={productArr} />
            <OtherInfo />
            <MessageBox />
        </div>
    );
}

export default Home;
