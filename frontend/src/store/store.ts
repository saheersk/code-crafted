import userSlice, { UserData } from "@/features/auth/userSlice";
import userInfoSlice, { UserInfoData } from "@/features/userInfo/userInfoSlice";
import userAdminInfoSlice, { UserAdminInfoData } from "@/features/admin/userData/userAdminInfoSlice";
import { configureStore } from "@reduxjs/toolkit";

export interface UserReducer {
    user: UserData;
}

export interface UserInfoReducer {
    userInfo: UserInfoData;
}

export interface UserAdminInfoReducer {
    userAdminInfo: UserAdminInfoData;
}

const store = configureStore({
    reducer: {
        user: userSlice,
        userInfo: userInfoSlice,
        userAdminInfo: userAdminInfoSlice
    },
});

export default store;
