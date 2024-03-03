import Notification from "./Notification";
import PostModal from "./PostModal";
import PostView from "./PostView";
import SidebarPost from "./SidebarPost";

function CommunityView() {
    return (
        <div className="flex bg-background">
            <SidebarPost />
            <PostModal />
            <div className="flex justify-center items-center flex-col w-full">
                <PostView />
            </div>
        </div>
    );
}

export default CommunityView;
