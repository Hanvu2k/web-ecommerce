import React, { useEffect } from "react";

import "../../css/home.scss";
import HomBanner from "./HomBanner";
import Categories from "./Categories";
import Product from "./Product";
import OtherInfo from "./OtherInfo";
import { MessageBox } from "../../components/MessageBox";
import apiConfig from "../../api/apiConfig";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            dispatch(apiConfig.getCart());
        }
    }, [token, dispatch]);

    useEffect(() => {
        const featchData = async () => {
            await dispatch(apiConfig.getMe());
        };
        featchData();
    }, [dispatch]);

    return (
        <div className="home-container">
            <HomBanner />
            <Categories />
            <Product />
            <OtherInfo />
            <MessageBox />
        </div>
    );
}

export default Home;
