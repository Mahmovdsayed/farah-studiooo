'use client'

import { addClient } from "@/app/actions/clients/addClient.action";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewClientForm = () => {

    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(
        addClient,
        {
            name: "",
            url: "",
            description: "",
            clientImage: File,
        } as any
    );
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new client has been added.",
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
    return <>
        <form action={formAction} className="flex flex-col gap-4" ref={formRef}>
            <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter client name"
                    id="name"
                    disabled={isPending}
                    required
                />
            </div>
            <div>
                <Label htmlFor="url">Client URL</Label>
                <Input
                    name="url"
                    type="url"
                    placeholder="Enter client URL"
                    id="url"
                    disabled={isPending}
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
                />
            </div>
            <div>
                <Label htmlFor="clientImage">
                    Client Image
                </Label>
                <Input
                    disabled={isPending}
                    name="clientImage"
                    type="file"
                    placeholder="Upload client image"
                    id="clientImage"
                    accept="image/*"
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
                <SubmitButton title="Client" />
            </div>
        </form>
    </>;
};

export default AddNewClientForm;