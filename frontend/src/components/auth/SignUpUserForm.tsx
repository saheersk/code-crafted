import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AUTH_URL } from "@/axiosConfig";
import { UserReducer } from "@/store/store";
import { useSelector } from "react-redux";

type SignUpData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    github?: string | null;
    linkedin?: string | null;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
};

const formSchema = z.object({
    firstName: z.string().min(4).max(50),
    lastName: z.string().min(2).max(50),
    username: z.string().min(8).max(50),
    email: z.string().email(),
    phoneNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(10, { message: "Phone number cannot exceed 10 digits" })
        .regex(/^\d{10}$/, { message: "Invalid Indian phone number format" }),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
});

function SignUpUserForm() {
    const userData = useSelector((state: UserReducer) => state.user.data);

    const [passwordError, setPasswordError] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            github: "",
            linkedin: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
        },
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    const onSubmit: SubmitHandler<SignUpData> = async (data: SignUpData) => {
        console.log(data);

        if (data.password !== data.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${AUTH_URL}/auth/register/`, {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.username,
                email: data.email,
                github: data.github,
                linkedin: data.linkedin,
                phone_number: "+91" + data.phoneNumber,
                password: data.password,
                confirm_password: data.confirmPassword,
            });

            const responseData: { status: boolean; user_id: number; message: string } = response.data;

            if (responseData.status) {
                navigate(`/otp/${responseData.user_id}`);
            }
            setPasswordError("");
            console.log("Sign Up successful:", response.data);
        } catch (error: any) {
            setMessage(error.response.data.message);
            console.error("Sign Up error:", error);
        }
    };

    useEffect(() => {
        if (userData?.role === "admin") {
            navigate("/admin");
        } else if (userData?.role === "hr") {
            navigate("/");
        }
    }, [userData]);

    return (
        <div className="bg-background h-screen flex justify-center items-center">
            <Card className="w-full max-w-md border-none">
                <CardHeader className="p-2">
                    <CardHeader className="p-2">
                        <CardTitle className="text-center text-4xl space-y-0 p-0">User Sign Up</CardTitle>
                    </CardHeader>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
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
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
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
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username"
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
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Number"
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
                                name="github"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Github Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Link"
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
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Linkedin Link</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Link"
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
                                                placeholder="Password"
                                                type="password"
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                type="password"
                                                {...field}
                                                className="bg-white placeholder:text-black text-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        {passwordError ? <FormMessage>{passwordError}</FormMessage> : ""}
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex justify-center items-center flex-col">
                                <p className="text-red-500 mb-3">{message}</p>
                                <Button type="submit">Sign Up</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUpUserForm;
