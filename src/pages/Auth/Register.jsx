import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import routes from "../../configs/routes";

import { authActions } from "../../store/auth"; // Importing the authActions from the auth store
import { validattion } from "../../utils"; // Import validattion util
import AuthLayout from "./AuthLayout";

function Register() {
    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const [errors, setError] = useState();
    // Getting the authentication status
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the home page if the user is already authenticated
        if (isAuthenticated) {
            navigate(routes.home);
        }
    }, [isAuthenticated, navigate]);

    const signUpUser = (e) => {
        e.preventDefault();

        const userInfo = {
            id: Math.floor(Math.random() * 100000),
            fullName: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
        };

        // Validate user input
        const validationErrors = validattion(userInfo);
        setError(validattion(userInfo).register);

        if (!validationErrors.register) {
            // Dispatch login action to authenticate the user
            dispatch(
                authActions.loginHandler({
                    userInfo: userInfo,
                    type: "REGISTER",
                })
            );

            // Clear input fields
            fullNameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            phoneRef.current.value = "";
        }
    };

    return (
        <AuthLayout>
            <div className="auth-form-content">
                <form onSubmit={signUpUser}>
                    <div
                        className={`form-control ${
                            errors?.fullName && "validate"
                        }`}
                    >
                        <input
                            ref={fullNameRef}
                            type="text"
                            placeholder="Full Name"
                        />
                        {errors?.fullName && (
                            <p className="validate-text">{errors?.fullName}</p>
                        )}
                    </div>
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
                            type="password"
                            placeholder="Password"
                        />
                        {errors?.password && (
                            <p className="validate-text">{errors?.password}</p>
                        )}
                    </div>
                    <div
                        className={`form-control ${
                            errors?.phone && "validate"
                        }`}
                    >
                        <input ref={phoneRef} type="text" placeholder="Phone" />
                        {errors?.phone && (
                            <p className="validate-text">{errors?.phone}</p>
                        )}
                    </div>

                    <div className="form-btn">
                        <button type="submit" className="btn-primary btn-form">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Register;
