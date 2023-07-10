import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./PopUp";
import inforProductReducer from "./inforProduct";
import authReducer from "./auth";
import cartReducer from "./cart";
import messageReducer from "./message";

// Create the Redux store with combined reducers
const store = configureStore({
    reducer: {
        popup: popupReducer,
        detailProduct: inforProductReducer,
        auth: authReducer,
        cart: cartReducer,
        message: messageReducer,
    },
});

export default store;
