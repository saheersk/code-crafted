import { createSlice } from "@reduxjs/toolkit";

export type UserAdminInfo = {
    id: number | null;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_blocked: boolean;
};

type UserAdminInfoPayload = {
    payload: UserAdminInfo[];
    type: string;
};

type UserAdminInfoIdPayload = {
    payload: UserAdminInfo;
    type: string;
};

export type UserAdminInfoData = {
    data: UserAdminInfo[] | null;
};


const initialState: UserAdminInfoData = {
    data:[  {
        id: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        is_blocked: false,
    },]
};

const userAdminInfoSlice = createSlice({
    name: "userAdminInfo",
    initialState,
    reducers: {
        setUserAdminInfo: (state, action: UserAdminInfoPayload) => {
            state.data = action.payload;
        },
        updateUserAdminInfo: (state, action: UserAdminInfoIdPayload) => {
            const updatedData = state.data?.map(user => {
                if (user.id === action.payload?.id) {
                    return {
                        ...user,
                        is_blocked: action.payload.is_blocked
                    };
                }
                return user;
            });
            state.data = updatedData ?? null;
        },
    },
});

export const { setUserAdminInfo, updateUserAdminInfo } = userAdminInfoSlice.actions;

export default userAdminInfoSlice.reducer;
