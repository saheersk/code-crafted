import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/features/userInfo/userInfoSlice";
import { UserInfoReducer, UserReducer } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: UserInfoReducer) => state.userInfo.data);
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/login")
        }
        
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
        <div className="w-full">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <Avatar className="w-[100px] h-[100px] bg-background">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback className="bg-primary">CN</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-black">
                        {userInfo?.first_name} {userInfo?.last_name}
                    </CardTitle>
                    <span className="text-[#565656]">{userInfo?.username}</span>
                </CardHeader>
                <CardContent className="text-black text-lg flex flex-col">
                    <span className="mb-2">Rank: 1000</span>
                    <span className="mb-2">
                        Github: <small className="text-blue-700">{userInfo?.github ? userInfo?.github : ""}</small>
                    </span>
                    <span>
                        Linkedin:{" "}
                        <small className="text-blue-700">{userInfo?.linkedin ? userInfo?.linkedin : ""}</small>
                    </span>
                </CardContent>
                <CardFooter>
                    <Link to="/profile/edit">
                        <Button className="mx-auto w-[200px] bg-green-500 text-md text-green-800">Edit Profile</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Sidebar;
