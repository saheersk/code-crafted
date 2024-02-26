import { createSlice } from "@reduxjs/toolkit";

export type UserInfo = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    github?: string | null;
    linkedin?: string | null;
};

type UserInfoPayload = {
    payload: UserInfo;
    type: string;
};

export type UserInfoData = {
    data: UserInfo | null;
};

const initialState: UserInfoData = {
    data: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        github: "",
        linkedin: "",
    },
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action: UserInfoPayload) => {
            state.data = action.payload;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
