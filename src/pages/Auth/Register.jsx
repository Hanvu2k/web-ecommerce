import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import routes from "../../configs/routes";
import AuthLayout from "./AuthLayout";
import apiConfig from "../../api/apiConfig";

function Register() {
    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();
    const [errors, setError] = useState();
    // Getting the authentication status
    const { err, token } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the home page if the user is already authenticated
        if (token) {
            navigate(routes?.home);
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!err?.success && err?.message?.includes("Email")) {
            setError({
                email: err?.message,
                password: null,
                phone: null,
                fullName: null,
            });
        }

        if (!err?.success && err?.message?.includes("password")) {
            setError({
                email: null,
                password: err?.message,
                phone: null,
                fullName: null,
            });
        }
        if (!err?.success && err?.message?.includes("Fullname")) {
            setError({
                email: null,
                password: null,
                phone: null,
                fullName: err?.message,
            });
        }
        setTimeout(() => {
            setError({});
        }, 2000);
    }, [setError, err]);

    const validate = (userInfo) => {
        if (
            !userInfo.email ||
            !userInfo.password ||
            !userInfo.fullName ||
            !userInfo.phoneNumber
        ) {
            setError({
                email: "Email required!",
                password: "Password required!",
                phone: "Phone number required!",
                fullName: "Full name required!",
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
                phone: null,
                fullName: null,
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
                phone: null,
                fullName: null,
            });
            setTimeout(() => {
                setError({});
            }, 1000);
            return false;
        }
        if (isNaN(userInfo.phoneNumber)) {
            setError({
                email: null,
                password: null,
                phone: "Phone number must be number type!",
                fullName: null,
            });
            setTimeout(() => {
                setError({});
            }, 1000);
            return false;
        }
        return true;
    };

    const signUpUser = async (e) => {
        e.preventDefault();

        const userInfo = {
            fullName: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phoneNumber: phoneRef.current.value,
        };

        const validated = validate(userInfo);

        if (validated) {
            // Dispatch login action to authenticate the user

            await dispatch(apiConfig.registerUser(userInfo));

            // Clear input fields
            if (Object.keys(err).length === 0) {
                fullNameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                phoneRef.current.value = "";
            }
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
