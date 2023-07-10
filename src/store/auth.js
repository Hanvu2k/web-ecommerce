import { createSlice } from "@reduxjs/toolkit";

import { saveToStorage, getFromStorage } from "../utils";

// get authentication state from localStorage or set default values
const userArr = JSON.parse(getFromStorage("usersArr")) || [];
const currUser = JSON.parse(getFromStorage("currUser")) || {};
const isAuthenticated = JSON.parse(getFromStorage("isAuthenticated")) || false;

// Define the initial state for the authSlice
const initialAuthState = {
    isAuthenticated: isAuthenticated || false,
    currUser: currUser || {},
    userArr: userArr || [],
};

const authSlice = createSlice({
    name: "Auth",
    initialState: initialAuthState,
    reducers: {
        // Action handler for login/register
        loginHandler(state, actions) {
            state.isAuthenticated = true;

            // Update authentication state based on the login/register action payload
            if (actions.payload.type === "REGISTER") {
                state.userArr = [...state.userArr, actions.payload.userInfo];
                state.currUser = actions.payload.userInfo;
            }

            if (actions.payload.type === "LOGIN") {
                state.userArr = [...state.userArr];
                const existingUser = state.userArr.findIndex(
                    (user) =>
                        user.email === actions.payload.userInfo.email &&
                        user.password === actions.payload.userInfo.password
                );

                if (existingUser !== -1) {
                    state.currUser = state.userArr[existingUser];
                }
            }

            // Save the updated state to localStorage and reload the page
            saveToStorage("currUser", JSON.stringify(state.currUser));
            saveToStorage("usersArr", JSON.stringify(state.userArr));
            saveToStorage(
                "isAuthenticated",
                JSON.stringify(state.isAuthenticated)
            );
            window.location.reload();
        },

        // Action handler for logout
        logoutHandler(state) {
            state.isAuthenticated = false;
            state.currUser = {};
            state.userArr = [...state.userArr];
            // Remove the current user from localStorage, save updated state, and reload the page
            localStorage.removeItem("currUser");
            saveToStorage(
                "isAuthenticated",
                JSON.stringify(state.isAuthenticated)
            );
            window.location.reload();
        },
    },
});

// Export the generated action creators
export const authActions = authSlice.actions;

export default authSlice.reducer;
