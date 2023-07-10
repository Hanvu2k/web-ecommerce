import React from "react";
import { useNavigate, useMatch } from "react-router-dom";

import "../../css/authLayout.scss"; //Import style for authLayout
import routes from "../../configs/routes"; // Import routes config

function AuthLayout({ children }) {
    const navigate = useNavigate();
    // Checking current route matches the register route
    const isViewRegister = useMatch(routes.register);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-form-title">
                    {isViewRegister ? "sign up" : "sign in"}
                </div>
                {children}
                <div className="auth-form-change">
                    {isViewRegister ? (
                        <>
                            <span>Login? </span>
                            <span onClick={() => navigate(routes.login)}>
                                Click
                            </span>
                        </>
                    ) : (
                        <>
                            <span>Create an account? </span>
                            <span onClick={() => navigate(routes.register)}>
                                Sign up
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
