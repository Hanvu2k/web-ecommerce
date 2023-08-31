import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

// get product trending
export const getTrendingProduct = createAsyncThunk(
    "product/trendingProduct",
    async () => {
        try {
            const res = await axiosClient.get("product/getProductsTrending");
            return res.products;
        } catch (error) {
            console.log(error);
        }
    }
);

// get product by id
export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (productId) => {
        try {
            const res = await axiosClient.get(
                `product/getProductById/${productId}`
            );

            return res.product;
        } catch (error) {
            console.log(error);
        }
    }
);

// get related product
export const getRelatedProduct = createAsyncThunk(
    "product/getRelatedProduct",
    async (productId) => {
        try {
            const res = await axiosClient.get(
                `product/getRelatedProduct/${productId}`
            );

            return res.products;
        } catch (error) {
            console.log(error);
        }
    }
);

// get all product
export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        try {
            const res = await axiosClient.get(`product/getAllProducts`);
            return res.products;
        } catch (error) {
            console.log(error);
        }
    }
);

// get product by category
export const getProductsByCategory = createAsyncThunk(
    "product/getProductsByCategory",
    async (category) => {
        try {
            const res = await axiosClient.get(
                `product/getProductsByCategory?category=${category}`
            );
            return res.products;
        } catch (error) {
            console.log(error);
        }
    }
);

// search product
export const searchProductByKey = createAsyncThunk(
    "product/searchProduct",
    async (searchTerm) => {
        try {
            const res = await axiosClient.get(
                `product/searchProduct?searchTerm=${searchTerm}`
            );
            return res.products;
        } catch (error) {
            console.log(error);
        }
    }
);
