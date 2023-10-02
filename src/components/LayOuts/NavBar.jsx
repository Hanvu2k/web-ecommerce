import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useMatch, useNavigate } from "react-router-dom";

import "../../css/navbar.scss"; // Importing the navbar styling
import { userActions } from "../../store/userSlice"; // Importing the userActions from the auth store
import routes from "../../configs/routes"; // Importing the routes configuration
import { ReactComponent as CartIcon } from "../../assets/icon/Cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icon/User-Outline.svg";
import { ReactComponent as DownArrow } from "../../assets/icon/vectorDown.svg";
import apiConfig from "../../api/apiConfig";

function NavBar({ userInfo, isAuth }) {
    // Getting the authentication status
    const navigate = useNavigate();

    const isHome = useMatch(routes?.home);
    const isShop = useMatch(routes?.shop);
    const isHistory = useMatch(routes?.history);

    const dispatch = useDispatch();

    // Dispatching the logoutHandler action when the user logs out
    const userLogOuthandler = () => {
        navigate(routes?.home);
        dispatch(userActions.logoutHandler());
        dispatch(apiConfig.logout());
    };

    // Navigating to the cart route when the cart icon is clicked
    const moveToCartHandler = () => {
        navigate(routes?.cart, { replace: true });
    };

    return (
        <nav className="nav-container ">
            <div className="nav-content container d-flex justify-content-between align-items-center">
                <div className="nav-left d-flex">
                    <NavLink
                        to={routes?.home}
                        className={`nav-item ${isHome && "active"}`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={routes?.shop}
                        className={`nav-item mx-3 ${isShop && "active"}`}
                    >
                        Shope
                    </NavLink>
                    {isAuth && (
                        <NavLink
                            to={routes?.history}
                            className={`nav-item ${isHistory && "active"}`}
                        >
                            History
                        </NavLink>
                    )}
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

                    {isAuth ? (
                        <>
                            <div className="nav-item d-flex mr-3 ">
                                <div className="nav-item-icon mr-1">
                                    <UserIcon />
                                </div>
                                <div>{userInfo?.user?.fullName}</div>
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
                            onClick={() => navigate(routes?.login)}
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
