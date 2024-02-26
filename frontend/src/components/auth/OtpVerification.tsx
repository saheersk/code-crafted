import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TokenInfo, loginFailure, loginSuccess } from "@/features/auth/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserReducer } from "@/store/store";
import { AUTH_URL } from "@/axiosConfig";
import axios from "axios";

const formSchema = z.object({
    otp: z.string().min(6).max(6),
});

function OtpVerification() {
    const dispatch = useDispatch();
    const userData = useSelector((state: UserReducer) => state.user.data);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    });

    const { isValid } = form.formState;
    const { id } = useParams();
    const [timer, setTimer] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendDisabled(false);
        }
        if(userData?.role === "admin") {
            navigate("/admin")
        }else if(userData?.role === "hr") {
            navigate("/")
        }
        else if(userData?.role === "user") {
            navigate("/")
        }
        return () => clearInterval(intervalId);
    }, [timer, userData]);

        const onSubmit = async (values: z.infer<typeof formSchema>) => {

            console.log(id, "user_id");
            
        try {
            const response = await axios.post(`${AUTH_URL}/auth/verify-otp/`, {
                otp: values.otp,
                user_id: id
            });

            const responseData: TokenInfo = response.data;

            if (responseData.status) {
                dispatch(loginSuccess(responseData));

                if (responseData?.role === "admin") {
                    navigate("/admin");
                } else if (responseData?.role === "hr") {
                    navigate("/");
                } else {
                    navigate("/");
                }
            } else {
                console.log(responseData);
                dispatch(loginFailure(responseData));
            }
            console.log("otp successful:", response.data);
        } catch (error) {
            console.error("otp error:", error);
        }
    }

    function handleResend() {
        console.log("Resend OTP");
        setTimer(300);
        setIsResendDisabled(true);
    }

    return (
        <div className="bg-background h-screen flex justify-center items-center">
            <Card className="w-full max-w-md border-none">
                <CardHeader>
                    <CardTitle className="text-center text-5xl">Otp Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One Time Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="digit"
                                                {...field}
                                                className="bg-white placeholder:text-black text-black"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between items-center">
                                <Button type="submit" disabled={!isValid}>
                                    Submit
                                </Button>
                                <span className="text-red-500">
                                    {timer > 0 ? `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60}` : ""}
                                </span>
                                <Button disabled={!isResendDisabled} onClick={handleResend}>
                                    Resend
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default OtpVerification;
