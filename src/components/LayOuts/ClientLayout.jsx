import React from "react";
import { Outlet, useMatch } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import routes from "../../configs/routes"; //Import routes config
import "../../css/clientLayout.scss"; // Import the clientLayout styling

function ClientLayout() {
    const isViewLogin = useMatch(routes.login); // Checking current route matches the login route
    const isViewRegister = useMatch(routes.register); // Checking current route matches the register route

    // Checking current route is either the login or register route
    const isViewBlank = isViewLogin || isViewRegister;

    // If the current route is login or register, display the nested routes
    if (isViewBlank) {
        return <Outlet />;
    }

    return (
        <div className="clientLayout">
            <NavBar />
            <div className="warrper container">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default ClientLayout;
