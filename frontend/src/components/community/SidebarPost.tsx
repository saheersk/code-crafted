import notification from "@/assets/icons/notification-solid.svg";
import home from "@/assets/icons/home.svg";
import create from "@/assets/icons/create.svg";
import explore from "@/assets/icons/explore.svg";
import message from "@/assets/icons/message.svg";
import logout from "@/assets/icons/logout.svg";
import { useState } from "react";

function SidebarPost() {
    const [activeItem, setActiveItem] = useState<string>("");
    const [showSidebar, setShowSidebar] = useState(true);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <>
            {showSidebar ? (
                <div className="flex flex-col justify-between h-screen w-[5%] bg-background border-r-2 border-slate-500 rounded-r-lg">
                    <div className="px-4 py-6 w-[30px]">
                        <span className="grid h-10 rounded-lg text-3xl font-bold px-1 dark:text-slate-400">C</span>

                        <ul className="mt-6 space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-1 py-2 text-sm font-medium w-[30px] dark:text-slate-200 flex items-center ${
                                        activeItem === "home" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("home")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={home}
                                        alt="Home"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-1 py-2 text-sm w-[30px] font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "explore" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("explore")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={explore}
                                        alt="explore"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-1 py-2 w-[30px] text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "create" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("create")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={create}
                                        alt="create"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-1 py-2 w-[30px] text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "notification" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("notification")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={notification}
                                        alt="notification"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-1 py-2 w-[30px] text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "message" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("message")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={message}
                                        alt="message"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center mx-4 pb-4 w-[30px]">
                        <img className="w-[24px] dark:filter dark:brightness-0 dark:invert" src={logout} alt="logout" />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-between h-screen w-[20%] bg-background border-r-2 border-slate-500 rounded-r-lg">
                    <div className="px-4 py-6">
                        <span className="grid h-10 rounded-lg text-3xl font-bold dark:text-slate-400">CodeCrafted</span>
                        <ul className="mt-6 space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "home" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("home")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={home}
                                        alt="Home"
                                    />
                                    <span className="ml-4 text-lg">Home</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "explore" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("explore")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={explore}
                                        alt="explore"
                                    />
                                    <span className="ml-3 text-lg">Explore</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "create" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("create")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={create}
                                        alt="create"
                                    />
                                    <span className="ml-3 text-lg">Create</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "notification" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("notification")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={notification}
                                        alt="notification"
                                    />
                                    <span className="ml-3 text-lg">Notification</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium dark:text-slate-200 flex items-center ${
                                        activeItem === "message" ? "bg-slate-700" : "hover:bg-slate-700"
                                    }`}
                                    onClick={() => handleItemClick("message")}
                                >
                                    <img
                                        className="w-[24px] dark:filter dark:brightness-0 dark:invert"
                                        src={message}
                                        alt="message"
                                    />
                                    <span className="ml-3 text-lg">Message</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center px-4 pb-4">
                        <img className="w-[24px] dark:filter dark:brightness-0 dark:invert" src={logout} alt="logout" />
                        <span className="ml-4 text-lg dark:text-slate-200">Logout</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default SidebarPost;
