import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

export const createOrder = createAsyncThunk(
    "/order/create",
    async (userInfo) => {
        try {
            const res = await axiosClient.post("/order/create", userInfo);
            return res.order;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getOrder = createAsyncThunk("/order/getOrder", async () => {
    try {
        const res = await axiosClient.get("/order/getOrder");
        return res.order;
    } catch (error) {
        console.log(error);
    }
});

export const getOrderDetailById = createAsyncThunk(
    "/order/getOrderDetail",
    async (orderId) => {
        try {
            const res = await axiosClient.get(
                `/order/getOrderDetail?orderId=${orderId}`
            );
            return res.orderDetail;
        } catch (error) {
            console.log(error);
        }
    }
);
