import AdminSidebar from "@/components/admin/userTable/AdminSidebar";
import UserTable from "@/components/admin/userTable/UserTable";
import NavBar from "@/components/common/NavBar";

function UserManagement() {
    return (
        <div className="flex">
            <div>
                <AdminSidebar />
            </div>
            <div className="w-full">
                <UserTable />
            </div>
        </div>
    );
}

export default UserManagement;
