import CardItems from "./CardItems";
import { Submission } from "./Submission";
import UserDetails from "./UserDetails";

function ProfileDetails() {
    return (
        <div className="w-full flex flex-col items-center">
            <UserDetails />
            <CardItems />
            <Submission />
        </div>
    );
}

export default ProfileDetails;
