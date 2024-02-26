import NavBar from "@/components/common/NavBar";
import EditProfileForm from "@/components/profile/EditProfileForm";
import Sidebar from "@/components/profile/Sidebar";

function EditProfile() {
    return (
        <div>
            <NavBar />
            <div className="bg-background h-screen w-full flex justify-between pt-5 p-5">
                <div className="w-[30%]">
                    <Sidebar />
                </div>
                <div className="w-[70%] ml-3">
                    <EditProfileForm />
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
