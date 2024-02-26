import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import notification from "@/assets/notification.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/userSlice"; // Assuming you have a logout action defined
import { UserReducer } from "@/store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NavBar() {
    const dispatch = useDispatch();
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        // if (userData) {
        //     navigate("/");
        // }
    });

    return (
        <div className="flex justify-between bg-background h-[80px] items-center px-5 border-b-2 border-white">
            <div>
                <Link to="/">
                    <h1 className="text-3xl text-[#618FBA] cursor-pointer">CodeCrafted</h1>
                </Link>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className="mr-4 text-white">Problems</NavigationMenuLink>
                        <NavigationMenuLink className="mr-4 text-white">Leaderboard</NavigationMenuLink>
                        <NavigationMenuLink className="text-white">Community</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex justify-center items-center">
                <div className="mr-3 text-white">
                    <img className="filter brightness-0 invert" src={notification} alt="notification" />
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback className="bg-primary">CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {userData ? (
                                <>
                                    <DropdownMenuItem>
                                        <Link to="/profile">Hi, {userData.username}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>{userData.email}</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem>
                                        <Link to="/login" className="text-white mr-2">
                                            Login
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
