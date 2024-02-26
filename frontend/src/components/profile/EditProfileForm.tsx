import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/axiosInstance";
import { UserInfoReducer, UserReducer } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/features/userInfo/userInfoSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    firstName: z.string().min(5).max(50),
    lastName: z.string().min(2).max(50),
    username: z.string().min(4).max(50),
    phoneNumber: z
        .string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(10, { message: "Phone number cannot exceed 10 digits" })
        .regex(/^\d{10}$/, { message: "Invalid Indian phone number format" }),
    github: z.string().optional(),
    linkedin: z.string().optional(),
});

function EditProfileForm() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: UserInfoReducer) => state.userInfo.data);
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: userInfo?.first_name,
            lastName: userInfo?.last_name,
            username: userInfo?.username,
            phoneNumber: userInfo?.phone_number ? userInfo.phone_number.replace("+91", "") : "",
            github: userInfo?.github || "",
            linkedin: userInfo?.linkedin || "",
        },
    });

    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get("/info/");
                console.log(response.data);

                if (response.status) {
                    dispatch(setUserInfo(response.data));
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {
            const response = await axiosInstance.put("/info/", {
                first_name: values.firstName,
                last_name: values.lastName,
                phone_number: "+91" + values.phoneNumber,
                username: values.username,
                github: values.github,
                linkedin: values.linkedin,
            });
            console.log(response.data);

            if (response.status) {
                console.log("Success");
                dispatch(setUserInfo(response.data));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <div>
            {" "}
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">First Name</FormLabel>
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
                                <FormLabel className="text-white">Last Name</FormLabel>
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
                                <FormLabel className="text-white">Username</FormLabel>
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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Phone Number</FormLabel>
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
                        name="linkedin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Linkedin Link</FormLabel>
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
                        name="github"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Github Link</FormLabel>
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
                    <div className="w-full flex justify-center">
                        <Button type="submit" className="bg-primary text-black">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default EditProfileForm;
