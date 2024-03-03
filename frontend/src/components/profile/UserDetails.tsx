import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/features/userInfo/userInfoSlice";
import { UserInfoReducer, UserReducer } from "@/store/store";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";

function UserDetails() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: UserInfoReducer) => state.userInfo.data);
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    useEffect(() => {
        // if (!userData) {
        //     navigate("/login")
        // }

        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get("/info/");
                console.log(response.data);

                if (response.status) {
                    dispatch(setUserInfo(response.data));
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="w-[80%] flex justify-between items-center relative">
            <div className="absolute top-0 right-0 mt-2 mr-2">
                <Settings />
            </div>
            <div className="flex justify-center items-center">
                <Avatar className="w-[200px] h-[200px] bg-background">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="bg-primary">CN</AvatarFallback>
                </Avatar>
                <span className="dark:text-gray text-black ml-3">saheer sk</span>
            </div>
            <div>
                <h6 className="dark:text-gray text-black">Rank: 100</h6>
            </div>
        </div>
    );
}

export default UserDetails;
