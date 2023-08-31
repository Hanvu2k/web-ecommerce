import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./PopUpSilce";
import inforProductReducer from "./inforProduct";
import cartReducer from "./cartSlice";
import messageReducer from "./messageSlice";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";

// Create the Redux store with combined reducers
const store = configureStore({
    reducer: {
        popup: popupReducer,
        detailProduct: inforProductReducer,
        cart: cartReducer,
        message: messageReducer,
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    },
});

export default store;
