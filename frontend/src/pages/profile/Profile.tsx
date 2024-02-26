import NavBar from "@/components/common/NavBar";
import Activity from "@/components/profile/Activity";
import Sidebar from "@/components/profile/Sidebar";
import Submission from "@/components/profile/Submission";

function Profile() {
    return (
        <div>
            <NavBar />
            <div className="bg-background h-screen w-full flex justify-between pt-5 p-5">
                <div className="w-[30%]">
                    <Sidebar />
                </div>
                <div className="w-[70%] ml-3">
                    <Activity />
                    <Submission />
                </div>
            </div>
        </div>
    );
}

export default Profile;
