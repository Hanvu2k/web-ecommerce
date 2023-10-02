import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getMe, registerUser } from "../api/userApi";
import { removeToken } from "../utils/token";

// Define the initial state for the cartSlice
const initialUserState = {
    isLoading: false,
    user: {},
    err: {},
    token: "",
};

const UserSilce = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        // Action handler for logout
        logoutHandler() {
            removeToken();
        },
    },
    extraReducers: {
        // register
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (!action.payload?.success) {
                state.err = action.payload;
            } else {
                state.user = action.payload.user;
                state.token = action.payload?.user?.token;
            }
        },
        [registerUser.rejected]: (state) => {
            state.isLoading = false;
        },

        // login
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (!action.payload?.success) {
                state.err = action.payload;
            } else {
                state.user = action.payload.user;
                state.token = action.payload?.user?.token;
            }
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false;
        },

        // get user info
        [getMe.pending]: (state) => {
            state.isLoading = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.token = action.payload?.user?.token;
        },
        [getMe.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

// Export the generated action creators
export const userActions = UserSilce.actions;

export default UserSilce.reducer;
