import routes from "../configs/routes";

import { Home } from "../pages/Home";
import { Detail } from "../pages/Detail";
import { Shop } from "../pages/Shop";
import { Login, Register } from "../pages/Auth";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { History } from "../pages/history";
import { OrderDetail } from "../pages/OrderDetail";

// Define an array of public routes
const publicRoutes = [
    {
        path: routes?.home, // Path for the home page
        component: <Home />, // Component to render for the home page
        name: "Home page", // Name of the route
    },
    {
        path: routes?.detail, // Path for the detail page
        component: <Detail />, // Component to render for the detail page
        name: "Detail page", // Name of the route
    },
    {
        path: routes?.shop, // Path for the shop page
        component: <Shop />, // Component to render for the shop page
        name: "Shop page", // Name of the route
    },
    {
        path: routes?.login, // Path for the login page
        component: <Login />, // Component to render for the login page
        name: "Login page", // Name of the route
    },
    {
        path: routes?.register, // Path for the register page
        component: <Register />, // Component to render for the register page
        name: "Register page", // Name of the route
    },
    {
        path: routes?.cart, // Path for the cart page
        component: <Cart />, // Component to render for the cart page
        name: "Cart page", // Name of the route
    },
    {
        path: routes?.checkout, // Path for the checkout page
        component: <Checkout />, // Component to render for the checkout page
        name: "Checkout page", // Name of the route
    },
    {
        path: routes?.history, // Path for the checkout page
        component: <History />, // Component to render for the checkout page
        name: "history", // Name of the route
    },
    {
        path: routes?.infoOrder, // Path for the checkout page
        component: <OrderDetail />, // Component to render for the checkout page
        name: "history", // Name of the route
    },
    {
        path: "/*", // Wildcard path for any other pages
        component: <div>Not Pages</div>, // Component to render for unknown pages
        name: "Oh! Not Pages", // Name of the route
    },
];

export default { publicRoutes };
