import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenInfo, loginFailure, loginSuccess } from "@/features/auth/userSlice";
import { UserReducer } from "@/store/store";
import { AUTH_URL } from "@/axiosConfig";
import axios from "axios";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(50),
});

function LoginForm() {
    const dispatch = useDispatch();
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${AUTH_URL}/auth/login/`, data);

            const responseData: TokenInfo = response.data;
            console.log(responseData);

            if (responseData.status) {
                console.log(responseData.role === "admin", "user=============");
                dispatch(loginSuccess(responseData));

                if (responseData?.role === "admin") {
                    console.log("admin===========");
                    navigate("/admin");
                } else if (responseData?.role === "hr") {
                    console.log("hr============");
                    navigate("/");
                } else {
                    navigate("/");
                }
            } else {
                console.log(responseData);
                dispatch(loginFailure(responseData));
            }
        } catch (error: any) {
            setMessage(error.response.data.message);
            console.error("Error:", error);
            if (error.response.status === 400) {
                dispatch(loginFailure(error.response.data));
            }
        }
    };

    useEffect(() => {
        if (userData?.role === "admin") {
            console.log("admin===========");
            navigate("/admin");
        } else if (userData?.role === "hr") {
            console.log("hr============");
            navigate("/");
        }
    });

    return (
        <div className="bg-background h-screen flex justify-center items-center">
            <Card className="w-full max-w-md border-none">
                <CardHeader>
                    <CardTitle className="text-center text-5xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                {...field}
                                                className="bg-white placeholder:text-black text-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                                className="bg-white placeholder:text-black text-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex justify-center items-center flex-col">
                                <p className="text-red-500 mb-3">{message}</p>
                                <Button type="submit">Login</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer mb-4 text-center text- mx-auto w-full">
                        <Button
                            onClick={toggleDialog}
                            variant="outline"
                            className="cursor-pointer text-center text-white"
                        >
                            Sign up
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Choose User Type</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            <div className="flex flex-col space-y-4">
                                <Link to="/sign-up/user">
                                    <Button variant="outline" className="text-white w-full">
                                        Regular User
                                    </Button>
                                </Link>
                                <Link to="/sign-up/hr">
                                    <Button variant="outline" className="text-white w-full">
                                        HR
                                    </Button>
                                </Link>
                            </div>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Card>
        </div>
    );
}

export default LoginForm;
