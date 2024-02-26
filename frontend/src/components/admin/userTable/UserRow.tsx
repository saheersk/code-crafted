import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../../ui/button";
import { useEffect } from "react";
import axiosInstance from "@/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { UserAdminInfoReducer } from "@/store/store";
import { UserAdminInfo, setUserAdminInfo, updateUserAdminInfo } from "@/features/admin/userData/userAdminInfoSlice";

function UserRow() {
    const dispatch = useDispatch();
    const userAdminInfo: UserAdminInfo[] | null = useSelector(
        (state: UserAdminInfoReducer) => state.userAdminInfo.data
    );

    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get("/admin/user/all/");
            console.log(response.data);

            if (response.status) {
                dispatch(setUserAdminInfo(response.data));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleBlock = async (userId: number | null) => {
        try {
            const response = await axiosInstance.patch(`/admin/user/block/${userId}/`);
            console.log(response.data);

            if (response.status) {
                dispatch(updateUserAdminInfo(response.data));
                fetchUserDetails();
            }
        } catch (error) {
            console.error("Error blocking/unblocking user:", error);
        }
    };

    return (
        <>
            {userAdminInfo?.map((user: UserAdminInfo, index: number) => (
                <TableRow key={index}>
                    <TableCell className="font-medium text-white">{index + 1}</TableCell>
                    <TableCell className="text-white">{user.username}</TableCell>
                    <TableCell className="text-white">{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell className="text-white">
                        <Button
                            onClick={() => handleBlock(user.id)}
                            className={user.is_blocked ? "bg-green-700" : ""}
                            variant={!user.is_blocked ? "destructive" : "default"}
                        >
                            {!user.is_blocked ? "Block" : "Unblock"}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default UserRow;
