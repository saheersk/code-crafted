import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useRef, useState } from "react";
import { Label } from "../ui/label";

function PostModal() {
    const captionField = useRef();
    const [preview, setPreview] = useState("");
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    const formSchema = z
        .object({
            posts: z.string().optional(),
            caption: z.string().optional(),
        })
        .refine(
            (data) => {
                console.log(data.posts);
                if (!data.caption && !data.posts) return false;
                return true;
            },
            {
                message: "fill atlease one of the field",
                path: ["posts"],
            }
        );

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        const selectedImage = document.getElementById("upload") as HTMLInputElement;
        const image = selectedImage.files?.[0];
        if (image) {
            data.append("posts", image);
        }
        if (caption) {
            data.append("caption", caption);
        }
        // axios.post('http://localhost:3004/api/posts/create',data).then(res=>{
        //     console.log(res)
        //   toast({
        //     title: "New Post Created Successfully",
        //     action: (
        //       <div className="h-8 w-8 bg-emerald-500 text-white grid place-items-center rounded"><Check /></div>
        //     ),
        //   })
        //   onClose();
        //   router.refresh();
        // }).catch(err=>{
        //   console.log(err);
        //   toast({
        //     title: "Something Went Wrong",
        //     description:"Please try again!",
        //     action: (
        //       <div className="h-8 w-8 bg-rose-500 text-white grid place-items-center rounded"><X /></div>
        //     ),
        //   })
        // }).finally(()=>{
        //     setLoading(false);
        // })
    };

    const onClose = () => {
        form.reset();
    };

    return (
        <Dialog open={false} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create a Post</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <FormField
                                name="caption"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="col-span-6">
                                            <Textarea
                                                {...field}
                                                value={caption}
                                                className="border-0"
                                                placeholder="What's in your mind..."
                                                onChange={(e) => {
                                                    setCaption(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {preview ? (
                            <div className="col-span-6 relative">
                                <X
                                    className="absolute right-2 top-2 cursor-pointer text-slate-700 hover:text-black transition-all h-4 w-"
                                    onClick={() => setPreview("")}
                                />
                                <img
                                    src={preview}
                                    alt="uploading File"
                                    width={350}
                                    height={350}
                                    className="col-span-6 rounded-md w-full h-80 object-cover"
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <DialogFooter className="col-span-6 flex items-center justify-between">
                            <div className="w-full flex items-center justify-between">
                                <span className="flex flex-row gap-2">
                                    <FormField
                                        name="post"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-1 w-9">
                                                <Label
                                                    htmlFor="upload"
                                                    className="p-2 border hover:bg-blue-500/10 transition-all rounded"
                                                >
                                                    <ImageIcon className="text-blue-500" />
                                                    <Input
                                                        type="file"
                                                        className="hidden"
                                                        id="upload"
                                                        accept="image/*"
                                                        {...field}
                                                        onChange={({ target }) => {
                                                            if (target.files) {
                                                                const file = URL.createObjectURL(target.files[0]);
                                                                setPreview(file);
                                                            }
                                                        }}
                                                    />
                                                </Label>
                                            </FormItem>
                                        )}
                                    />
                                </span>
                                <Button disabled={loading} type="submit">
                                    {loading ? <Loader2 className="animate-spin" /> : "Submit"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default PostModal;
