import { createSlice } from "@reduxjs/toolkit";
import {
    getTrendingProduct,
    getProductById,
    getRelatedProduct,
    getProductsByCategory,
    getAllProduct,
    searchProductByKey,
} from "../api/productApi";

// Define the initial state for the cartSlice
const initialProductState = {
    isLoading: false,
    products: [],
    product: {},
    relatedProducts: [],
};

const ProductSilce = createSlice({
    name: "products",
    initialState: initialProductState,
    reducers: {},
    extraReducers: {
        // get trending products
        [getTrendingProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getTrendingProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [getTrendingProduct.rejected]: (state) => {
            state.isLoading = false;
        },

        // get product by id
        [getProductById.pending]: (state) => {
            state.isLoading = true;
        },
        [getProductById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        },
        [getProductById.rejected]: (state) => {
            state.isLoading = false;
        },

        // get related products
        [getRelatedProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getRelatedProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.relatedProducts = action.payload;
        },
        [getRelatedProduct.rejected]: (state) => {
            state.isLoading = false;
        },

        // get product by category
        [getProductsByCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [getProductsByCategory.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [getProductsByCategory.rejected]: (state) => {
            state.isLoading = false;
        },

        // get all product
        [getAllProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [getAllProduct.rejected]: (state) => {
            state.isLoading = false;
        },

        //search product
        [searchProductByKey.pending]: (state) => {
            state.isLoading = true;
        },
        [searchProductByKey.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [searchProductByKey.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

// Export the generated action creators
export const productActions = ProductSilce.actions;

export default ProductSilce.reducer;
