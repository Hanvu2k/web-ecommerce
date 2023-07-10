import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import "../../css/navbar.scss"; // Importing the navbar styling
import { authActions } from "../../store/auth"; // Importing the authActions from the auth store
import routes from "../../configs/routes"; // Importing the routes configuration
import { ReactComponent as CartIcon } from "../../assets/icon/Cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icon/User-Outline.svg";
import { ReactComponent as DownArrow } from "../../assets/icon/vectorDown.svg";

function NavBar() {
    // Getting the authentication status
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // Getting the current user informatione
    const userInfor = useSelector((state) => state.auth.currUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Dispatching the logoutHandler action when the user logs out
    const userLogOuthandler = () => {
        dispatch(authActions.logoutHandler());
    };

    // Navigating to the cart route when the cart icon is clicked
    const moveToCartHandler = () => {
        navigate(routes.cart, { replace: true });
    };

    return (
        <nav className="nav-container ">
            <div className="nav-content container d-flex justify-content-between align-items-center">
                <div className="nav-left d-flex">
                    <NavLink to={routes.home} className="nav-item mr-3">
                        Home
                    </NavLink>
                    <NavLink to={routes.shop} className="nav-item">
                        Shope
                    </NavLink>
                </div>
                <div className="nav-center">BOUTIQUE</div>
                <div className="nav-right d-flex ">
                    <div
                        className="nav-item d-flex mr-3"
                        onClick={moveToCartHandler}
                    >
                        <div className="nav-item-icon mr-1">
                            <CartIcon />
                        </div>
                        <div className="nav-item-title">Cart</div>
                    </div>

                    {isAuthenticated ? (
                        <>
                            <div className="nav-item d-flex mr-3 ">
                                <div className="nav-item-icon mr-1">
                                    <UserIcon />
                                </div>
                                <div>{userInfor.fullName}</div>
                                <div className="nav-item-icon ml-1">
                                    <DownArrow />
                                </div>
                            </div>
                            <div
                                className="log-out"
                                onClick={userLogOuthandler}
                            >
                                (LogOut)
                            </div>
                        </>
                    ) : (
                        <div
                            className="d-flex mr-3 nav-item"
                            onClick={() => navigate(routes.login)}
                        >
                            <div className="nav-item-icon mr-1">
                                <UserIcon />
                            </div>
                            <div>Login</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
