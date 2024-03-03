import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import heart from "@/assets/icons/heart-regular.svg";
import heartSolid from "@/assets/icons/heart-solid.svg";
import comment from "@/assets/icons/comment-regular.svg";

function PostView() {
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="block rounded-lg h-screen overflow-y-auto">
            <div className="w-[600px] my-3">
                <div className="w-full max-w-lg block rounded-lg p-3 shadow-sm border-b border-slate-300 mb-4">
                    <div className="flex h-full items-center">
                        <div className="flex flex-1 gap-2 items-center">
                            <Avatar className="mb-2">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="object-cover"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium dark:text-slate-200">saheer</h3>
                                <p className="text-xs dark:text-slate-200">Lorem ipsum</p>
                            </div>
                        </div>
                        <Button size={"lg"} className="dark:bg-slate-200 bg-blue-700 dark:text-black text-[#fff]">
                            Follow
                        </Button>
                    </div>
                    <Separator className="my-2 bg-black" />
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-56 w-full rounded-md object-cover"
                    />
                    <div className="mt-2">
                        <dl>
                            <div>
                                <dt className="sr-only dark:text-slate-200">Address</dt>
                                <dd
                                    className={`font-medium ${
                                        showFullContent ? "dark:text-slate-200" : "dark:text-slate-500"
                                    }`}
                                >
                                    {showFullContent ? (
                                        <>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content of a page when looking at its layout. The point of using
                                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                                            opposed to using 'Content here, content here', making it look like readable
                                            English. Many desktop publishing packages and web page editors now use Lorem
                                            Ipsum as their default model text, and a search for 'lorem ipsum' will
                                            uncover many web sites still in their infancy. Various versions have evolved
                                            over the years, sometimes by accident, sometimes on purpose (injected humour
                                            and the like).
                                        </>
                                    ) : (
                                        <>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content of a page...
                                        </>
                                    )}
                                </dd>
                                <button onClick={toggleContent} className="text-blue-500 dark:text-blue-400">
                                    {showFullContent ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </dl>

                        <div className="mt-6 flex items-center gap-8 text-xs">
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <img
                                    className="dark:filter dark:brightness-0 dark:invert w-[20px]"
                                    src={heart}
                                    alt="heart"
                                />
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500 dark:text-slate-200">0 likes</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <img
                                    className="dark:filter dark:brightness-0 dark:invert w-[20px]"
                                    src={comment}
                                    alt="comment"
                                />
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500 dark:text-slate-200">0 comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-lg block rounded-lg p-3 shadow-sm border-b border-slate-300 mb-4">
                    <div className="flex h-full items-center">
                        <div className="flex flex-1 gap-2 items-center">
                            <Avatar className="mb-2">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="object-cover"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium dark:text-slate-200">saheer</h3>
                                <p className="text-xs dark:text-slate-200">Lorem ipsum</p>
                            </div>
                        </div>
                        <Button size={"lg"} className="dark:bg-slate-200 bg-blue-700 dark:text-black text-[#fff]">
                            Follow
                        </Button>
                    </div>
                    <Separator className="my-2 bg-black" />
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="h-56 w-full rounded-md object-cover"
                    />
                    <div className="mt-2">
                        <dl>
                            <div>
                                <dt className="sr-only dark:text-slate-200">Address</dt>
                                <dd
                                    className={`font-medium ${
                                        showFullContent ? "dark:text-slate-200" : "dark:text-slate-500"
                                    }`}
                                >
                                    {showFullContent ? (
                                        <>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content of a page when looking at its layout. The point of using
                                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                                            opposed to using 'Content here, content here', making it look like readable
                                            English. Many desktop publishing packages and web page editors now use Lorem
                                            Ipsum as their default model text, and a search for 'lorem ipsum' will
                                            uncover many web sites still in their infancy. Various versions have evolved
                                            over the years, sometimes by accident, sometimes on purpose (injected humour
                                            and the like).
                                        </>
                                    ) : (
                                        <>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content of a page...
                                        </>
                                    )}
                                </dd>
                                <button onClick={toggleContent} className="text-blue-500 dark:text-blue-400">
                                    {showFullContent ? "Read Less" : "Read More"}
                                </button>
                            </div>
                        </dl>

                        <div className="mt-6 flex items-center gap-8 text-xs">
                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <img
                                    className="dark:filter dark:brightness-0 dark:invert w-[20px]"
                                    src={heart}
                                    alt="heart"
                                />
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500 dark:text-slate-200">0 likes</p>
                                </div>
                            </div>

                            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                                <img
                                    className="dark:filter dark:brightness-0 dark:invert w-[20px]"
                                    src={comment}
                                    alt="comment"
                                />
                                <div className="mt-1.5 sm:mt-0">
                                    <p className="text-gray-500 dark:text-slate-200">0 comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostView;
