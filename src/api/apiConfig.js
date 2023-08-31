import {
    getTrendingProduct,
    getProductById,
    getRelatedProduct,
    getProductsByCategory,
    getAllProduct,
    searchProductByKey,
} from "./productApi";
import { loginUser, getMe, registerUser, logout } from "./userApi";
import { addToCart, getCart, deleteProductInCart, updateCart } from "./cartApi";
import { createOrder, getOrder, getOrderDetailById } from "./orderApi";
import { getMessage, sendMessage } from "./messageApi";

const apiConfig = {
    // product
    getAllProduct,
    getTrendingProduct,
    getProductById,
    getRelatedProduct,
    getProductsByCategory,
    searchProductByKey,
    // user
    registerUser,
    loginUser,
    getMe,
    logout,
    // cart
    addToCart,
    getCart,
    deleteProductInCart,
    updateCart,
    // oder
    createOrder,
    getOrder,
    getOrderDetailById,
    // message
    getMessage,
    sendMessage,
};

export default apiConfig;
