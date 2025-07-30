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
import { sendMessage } from "@/app/actions/messages/sendMessage.action";

export default function Page() {

    const router = useRouter();
    const [open, setOpen] = useState(true);

    const [state, formAction, isPending] = useActionState(
        sendMessage,
        {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        } as any
    );
    const handleClose = () => {
        setOpen(false);
        router.push('/');
    };
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success("Message Sent!", {
                description: "Your message has been sent successfully.",
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
                    <DrawerTitle>Send Message</DrawerTitle>
                    <DrawerDescription className="text-start">
                        This is a quick message form. Please fill out the form below to send us a message.
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
                        <Label>Your Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            required
                            name="email"
                            id="email"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <Label>Your Phone (Optional)</Label>
                        <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            name="phone"
                            id="phone"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <Label>Subject</Label>
                        <Input
                            type="text"
                            placeholder="Enter the subject"
                            required
                            name="subject"
                            id="subject"
                            disabled={isPending}
                        />
                    </div>
                    <div>
                        <Label>Your Message</Label>
                        <Textarea
                            disabled={isPending}
                            placeholder="Type your message here."
                            id="message"
                            name="message"
                            className="h-32 resize-none"
                            required
                        />
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground text-start">please note we will contact you as soon as possible via your email or phone number</p>
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
