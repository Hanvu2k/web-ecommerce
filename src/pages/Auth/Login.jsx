import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../store/auth";
import { validattion } from "../../utils";
import AuthLayout from "./AuthLayout";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    // State to store login errors
    const [errors, setError] = useState();
    // Getting the authentication status
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home page if the user is already authenticated
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const signInUser = async (e) => {
        e.preventDefault();

        const userInput = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Validate user input
        const validationErrors = validattion(userInput);
        setError(validattion(userInput).login);

        if (!validationErrors.login) {
            // Dispatch login action to authenticate the user
            dispatch(
                authActions.loginHandler({ userInfo: userInput, type: "LOGIN" })
            );
            // Clear input fields
            emailRef.current.value = "";
            passwordRef.current.value = "";
        }
    };

    return (
        <AuthLayout>
            <div className="auth-form-content">
                <form onSubmit={signInUser}>
                    <div
                        className={`form-control ${
                            errors?.email && "validate"
                        }`}
                    >
                        <input ref={emailRef} type="text" placeholder="Email" />
                        {errors?.email && (
                            <p className="validate-text">{errors?.email}</p>
                        )}
                    </div>
                    <div
                        className={`form-control ${
                            errors?.password && "validate"
                        }`}
                    >
                        <input
                            ref={passwordRef}
                            type="current-password"
                            placeholder="Password"
                        />
                        {errors?.password && (
                            <p className="validate-text">{errors?.password}</p>
                        )}
                    </div>

                    <div className="form-btn">
                        <button type="submit" className="btn-primary btn-form">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Login;
