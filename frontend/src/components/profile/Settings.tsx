import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import settings from "@/assets/icons/ellipsis-vertical-solid.svg";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EditProfileForm from "./EditProfileForm";

function Settings() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage
                        className="w-[20px] h-[20px] dark:filter dark:brightness-0 dark:invert"
                        src={settings}
                        alt="settings"
                    />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-none w-full">
                            Edit Profile
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <EditProfileForm />
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Settings;
