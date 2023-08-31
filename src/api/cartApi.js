import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

// add product to card
export const addToCart = createAsyncThunk("cart/add", async (itemInfo) => {
    try {
        const res = await axiosClient.post("cart/add", itemInfo);
        return res.cart;
    } catch (error) {
        console.log(error);
    }
});

// get card
export const getCart = createAsyncThunk("cart/getCart", async () => {
    try {
        const res = await axiosClient.get("cart/getCart");

        return res.cart;
    } catch (error) {
        console.log(error);
    }
});

// delete product in  card
export const deleteProductInCart = createAsyncThunk(
    "cart/delete",
    async (productId) => {
        try {
            const res = await axiosClient.delete(
                `cart/delete?productId=${productId}`
            );
            return res.cart;
        } catch (error) {
            console.log(error);
        }
    }
);
// update card
export const updateCart = createAsyncThunk(
    "cart/updateQuantity",
    async (cart) => {
        try {
            const res = await axiosClient.patch(`cart/updateCart`, cart);
            return res.cart;
        } catch (error) {
            console.log(error);
        }
    }
);
