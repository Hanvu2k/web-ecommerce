import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import apiConfig from "../../api/apiConfig";
import AuthLayout from "./AuthLayout";
import routes from "../../configs/routes";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    // State to store login errors
    const [errors, setError] = useState();
    // Getting the authentication status
    const { err, token } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home page if the user is already authenticated
        if (token) {
            navigate(routes?.home);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!err?.success && err?.message?.includes("Email")) {
            setError({
                email: err?.message,
                password: null,
            });
        }

        if (!err?.success && err?.message?.includes("password")) {
            setError({
                email: null,
                password: err?.message,
            });
        }
        setTimeout(() => {
            setError({});
        }, 2000);
    }, [setError, err]);

    const validate = (userInfo) => {
        if (!userInfo.email || !userInfo.password) {
            setError({
                email: "Email required!",
                password: "Password required!",
            });
            setTimeout(() => {
                setError({});
            }, 1000);
            return false;
        }
        if (!userInfo.email.includes("@")) {
            setError({
                email: "Invalid email!",
                password: null,
            });
            setTimeout(() => {
                setError({});
            }, 1000);
            return false;
        }
        if (userInfo.password.length < 8) {
            setError({
                email: null,
                password: "Password must have at least 8 charector!",
            });
            setTimeout(() => {
                setError({});
            }, 1000);
            return false;
        }
        return true;
    };

    const signInUser = async (e) => {
        e.preventDefault();

        const userInput = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        const validated = validate(userInput);

        if (validated) {
            // Dispatch login action to authenticate the user
            await dispatch(apiConfig.loginUser(userInput));
            // Clear input fields

            if (Object.keys(err).length === 0) {
                emailRef.current.value = "";
                passwordRef.current.value = "";
            }
        }
    };

    return (
        <AuthLayout>
            <div className="auth-form-content">
                <form onSubmit={signInUser}>
                    <div
                        className={`form-control ${
                            errors?.email && "validate"
                        } `}
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
