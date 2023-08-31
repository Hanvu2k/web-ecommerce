import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";
import { setToken } from "../utils/token";

export const registerUser = createAsyncThunk(
    "user/register",
    async (userInfo) => {
        try {
            const res = await axiosClient.post("/auth/register", userInfo);

            if (res.success) {
                setToken(res.user.token, res.user);
            }

            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk("user/login", async (userInfo) => {
    try {
        const res = await axiosClient.post("/auth/login", userInfo);

        if (res?.success) {
            setToken(res.user.token, res.user);
        }

        return res;
    } catch (error) {
        console.log(error);
    }
});

export const getMe = createAsyncThunk("user/login", async () => {
    try {
        const res = await axiosClient.get("/auth/me");

        if (res?.success) {
            setToken(res.user.token, res.user);
        }
        return res;
    } catch (error) {
        console.log(error);
    }
});

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        const res = await axiosClient.post("/auth/logout");

        return res;
    } catch (error) {
        console.log(error);
    }
});
