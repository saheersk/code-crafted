import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Notification() {
    return (
        <div className="relative w-[50%] bg-secondary">
            <div className="absolute top-0 left-0 p-4 w-full">
                <h4 className="text-3xl text-slate-200 font-bold py-5">Notification</h4>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback className="bg-primary">CN</AvatarFallback>
                        </Avatar>
                        <p className="dark:text-slate-200 text-sm max-w-[500px]">
                            Short description about the profile.
                        </p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback className="bg-primary">CN</AvatarFallback>
                        </Avatar>
                        <p className="dark:text-slate-200 text-sm max-w-[500px]">
                            Short description about the profile.
                        </p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback className="bg-primary">CN</AvatarFallback>
                        </Avatar>
                        <p className="dark:text-slate-200 text-sm max-w-[500px]">
                            Short description about the profile.
                        </p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <Avatar className="mr-2">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback className="bg-primary">CN</AvatarFallback>
                        </Avatar>
                        <p className="dark:text-slate-200 text-sm max-w-[500px]">
                            Short description about the profile.
                        </p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Follow
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
