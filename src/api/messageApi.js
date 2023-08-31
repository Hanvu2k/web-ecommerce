import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

export const sendMessage = createAsyncThunk(
    "/message/send",
    async (message) => {
        try {
            const res = await axiosClient.post("/message/send", {
                message: message,
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getMessage = createAsyncThunk("/message/getMessage", async () => {
    try {
        const res = await axiosClient.get("/message/getMessage");
        return res.messages;
    } catch (error) {
        console.log(error);
    }
});
