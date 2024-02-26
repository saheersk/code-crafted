import { UserReducer } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    useEffect(() => {
        if (userData?.role !== "admin") {
            navigate("/");
        }
    });
    
    return (
        <div className="bg-background w-[300px] h-screen">
            <div>
                <h4 className="text-3xl text-[#618FBA] mb-5 pt-4 ml-2">CodeCrafted</h4>
            </div>
            <div>
                <ul>
                    <li className="text-white text-center text-lg">User Management</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminSidebar;
