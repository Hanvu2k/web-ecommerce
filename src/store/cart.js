import { createSlice } from "@reduxjs/toolkit";
import { saveToStorage, getFromStorage } from "../utils";

// get initial cart state from localStorage or set default values
const carts = JSON.parse(getFromStorage("carts")) || [];
const currUser = JSON.parse(getFromStorage("currUser")) || {};

// Find the index of the current cart in the carts array
const indexCart = carts?.findIndex((item) => {
    return item.userId === currUser?.id;
});

// get the current cart or set default values
const currCart = carts[indexCart];

// Define the initial state for the cartSlice
const initialCartState = {
    carts: carts || [],
    products: currCart?.products || [],
    total: currCart?.total || 0,
    userId: currUser?.id,
};

const cartSlice = createSlice({
    name: "Cart",
    initialState: initialCartState,
    reducers: {
        // Action handler for adding a product to the cart
        onAddToCart(state, action) {
            // Update the cart state based on the add to cart action payload
            if (state.userId === action.payload.userId) {
                const existingProductIndex = state.products.findIndex(
                    (item) =>
                        item.productId === action.payload.product.productId
                );

                if (existingProductIndex === -1) {
                    state.products.push(action.payload.product);
                } else {
                    state.products[existingProductIndex].quantitty +=
                        +action.payload.product.quantitty;
                    state.products[existingProductIndex].total =
                        state.products[existingProductIndex].quantitty *
                        +state.products[existingProductIndex].price;
                }

                state.total += action.payload.product.total;

                // update cart
                const userCart = state.carts.findIndex(
                    (item) => item.userId === action.payload.userId
                );
                if (userCart === -1) {
                    state.carts.push({
                        userId: state.userId,
                        products: state.products,
                        total: state.total,
                    });
                } else {
                    state.carts[userCart].userId = state.userId;
                    state.carts[userCart].products = state.products;
                    state.carts[userCart].total = state.total;
                }
            }

            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
        // Action handler for updating a product in the cart
        onUpdateToCart(state, action) {
            // Update the cart state based on the update cart action payload
            if (state.userId === action.payload.userId) {
                const productIndex = state.products.findIndex(
                    (item) => item.productId === action.payload.productId
                );
                if (action.payload.type === "DECREMENT") {
                    if (state.products[productIndex].quantitty === 1) {
                        state.total -= state.products[productIndex].price;
                        state.products = state.products.filter(
                            (item) =>
                                item.productId !== action.payload.productId
                        );
                    } else {
                        state.products[productIndex].quantitty -= 1;
                        state.products[productIndex].total -=
                            state.products[productIndex].price;
                        state.total -= state.products[productIndex].price;
                        state.products = [...state.products];
                    }
                }
                if (action.payload.type === "INCREMENT") {
                    state.products[productIndex].quantitty += 1;
                    state.products[productIndex].total +=
                        +state.products[productIndex].price;
                    state.total += +state.products[productIndex].price;
                }

                // update cart
                const userCart = state.carts.findIndex(
                    (item) => item.userId === action.payload.userId
                );
                if (userCart === -1) {
                    state.carts.push({
                        userId: state.userId,
                        products: state.products,
                        total: state.total,
                    });
                } else {
                    state.carts[userCart].userId = state.userId;
                    state.carts[userCart].products = state.products;
                    state.carts[userCart].total = state.total;
                }
            }

            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
        // Action handler for deleting a product from the cart
        onDeleteCart(state, action) {
            // Update the cart state based on the delete cart action payload
            if (state.userId === action.payload.userId) {
                const productIndex = state.products.findIndex(
                    (item) => item.productId === action.payload.productId
                );
                if (productIndex !== -1) {
                    state.total -= state.products[productIndex].total;
                    state.products = state.products.filter(
                        (product) =>
                            product.productId !== action.payload.productId
                    );
                }

                // update cart
                const userCart = state.carts.findIndex(
                    (item) => item.userId === action.payload.userId
                );

                state.carts[userCart].userId = state.userId;
                state.carts[userCart].products = state.products;
                state.carts[userCart].total = state.total;
            }
            // Update the cart in localStorage
            saveToStorage("carts", JSON.stringify(state.carts));
        },
    },
});

// Export the generated action creators
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
