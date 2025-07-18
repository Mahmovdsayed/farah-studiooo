"use client";

import { useActionState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { addService } from "@/app/actions/services/addServices.action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewServicesForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        addService,
        {
            title: "",
            description: "",
        } as any
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new service has been added.",
                duration: 3000,
                position: "top-center",
            });

            formRef.current?.reset();
        } else if (state.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="title">Service Name</Label>
                <Input
                    name="title"
                    type="text"
                    placeholder="Enter service name"
                    disabled={isPending}
                    id="title"
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    name="description"
                    placeholder="Type your service description here."
                    id="description"
                    disabled={isPending}
                    rows={5}
                    required
                />
            </div>

            {state?.message && !state.success && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            <div className="w-full flex flex-col items-center gap-2 md:flex-row-reverse md:justify-start md:text-end">
                <SubmitButton title="Service" />
            </div>
        </form>
    );
};

export default AddNewServicesForm;
