import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage, getFromStorage } from "../utils";
import { addToCart, deleteProductInCart, getCart } from "../api/cartApi";

// get initial cart state from localStorage or set default values
const carts = JSON.parse(getFromStorage("carts")) ||{};

// Define the initial state for the cartSlice
const initialCartState = {
    carts: carts || {
        products: [],
        total: 0,
    },
};

const cartSlice = createSlice({
    name: "Cart",
    initialState: initialCartState,
    reducers: {
        // Action handler for adding a product to the cart
        onAddToCart(state, action) {
            // Update the cart state based on the add to cart action payload
            const existingProductIndex = state.carts.products?.findIndex(
                (item) => {
                    return item.productId === action.payload.product.productId;
                }
            );

            if (existingProductIndex === -1) {
                state.carts.products.push(action.payload.product);
            } else {
                state.carts.products[existingProductIndex].quantity +=
                    +action.payload.product.quantity;
                state.carts.products[existingProductIndex].total +=
                    action.payload.product.total;
            }

            state.carts.total += action.payload.product.total;

            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
        // Action handler for updating a product in the cart
        onUpdateToCart(state, action) {
            // Update the cart state based on the update cart action payload
            const productIndex = state.carts.products.findIndex(
                (item) => item.productId === action.payload.productId
            );

            if (action.payload.type === "DECREMENT") {
                if (state.carts.products[productIndex].quantity === 1) {
                    state.carts.total -=
                        state.carts.products[productIndex].price;
                    state.carts.products = state.carts.products.filter(
                        (item) => item.productId !== action.payload.productId
                    );
                } else {
                    state.carts.products[productIndex].quantity -= 1;
                    state.carts.products[productIndex].total -=
                        state.carts.products[productIndex].price;
                    state.carts.total -=
                        state.carts.products[productIndex].price;
                    state.carts.products = [...state.carts.products];
                }
            }
            if (action.payload.type === "INCREMENT") {
                state.carts.products[productIndex].quantity += 1;
                state.carts.products[productIndex].total +=
                    +state.carts.products[productIndex].price;
                state.carts.total += +state.carts.products[productIndex].price;
            }

            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
        // Action handler for deleting a product from the cart
        onDeleteCart(state, action) {
            // Update the cart state based on the delete cart action payload
            const productIndex = state.carts.products.findIndex(
                (item) => item.productId === action.payload.productId
            );
            if (productIndex !== -1) {
                state.carts.total -= state.carts.products[productIndex].total;
                state.carts.products = state.carts.products.filter(
                    (product) => product.productId !== action.payload.productId
                );
            }

            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
    },
    extraReducers: {
        // add to cart
        [addToCart.pending]: (state) => {
            state.isLoading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.carts = action.payload;
        },
        [addToCart.rejected]: (state) => {
            state.isLoading = false;
        },

        // get cart
        [getCart.pending]: (state) => {
            state.isLoading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.carts = action.payload;

            saveToStorage("carts", JSON.stringify(state.carts));
        },
        [getCart.rejected]: (state) => {
            state.isLoading = false;
        },

        // delete product in cart
        [deleteProductInCart.pending]: (state) => {},
        [deleteProductInCart.fulfilled]: (state, action) => {
            state.carts = action.payload;
        },
        [deleteProductInCart.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

// Export the generated action creators
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
