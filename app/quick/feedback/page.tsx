"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Star } from "lucide-react";
import { IconCancel } from "@tabler/icons-react";
import { addTestimonials } from "@/app/actions/testimonials/addTestimonial.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { triggerConfetti } from "@/Helpers/ConfettiFireworks";

export default function Page() {

    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [rating, setRating] = useState(0);

    const [state, formAction, isPending] = useActionState(
        addTestimonials,
        {
            name: "",
            position: "",
            message: "",
            rating: rating,

        } as any
    );
    const handleClose = () => {
        setOpen(false);
        router.push('/');
    };
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success("Feedback is under review", {
                description: "Your feedback has been sent successfully.",
                duration: 3000,
                position: "top-center",
            });
            setOpen(false);
            triggerConfetti()
            setTimeout(() => {
                router.push('/');
            }, 3000);

        } else if (state.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);



    return (
        <Drawer open={open} onOpenChange={(val) => !val && handleClose()}>
            <DrawerContent className="lg:w-1/2 lg:m-auto">
                <DrawerHeader className="text-start flex items-start justify-start">
                    <DrawerTitle>Feedback</DrawerTitle>
                    <DrawerDescription className="text-start">
                        This is a feedback form. Please share your thoughts with us.
                    </DrawerDescription>
                </DrawerHeader>
                <form action={formAction} className="px-4 flex flex-col gap-4">
                    <div>
                        <Label>Your Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            required
                            name="name"
                            id="name"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <Label>Your Position Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter your position name"
                            required
                            name="position"
                            id="position"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <Label>Your Message</Label>
                        <Textarea
                            rows={5}
                            disabled={isPending}
                            placeholder="Type your message here."
                            id="message"
                            name="message"
                        />
                    </div>
                    <div>
                        <Label>Rating</Label>
                        <div className="flex items-center bg-accent w-fit px-3 py-2 rounded-2xl gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    className={`cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                            <Input type="number" className="hidden" value={rating}
                                onChange={(e) => setRating(Number(e.target.value))} name="rating" id="rating" />
                        </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground text-start">please note your feedback will appear on the main page after reviewing it</p>
                    {state?.message && !state.success && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {state.message}
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button disabled={isPending} type="submit"><Send /> Send</Button>
                </form>
                <DrawerFooter className="mt-0 pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={handleClose}>
                            <IconCancel />  Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    );
}
