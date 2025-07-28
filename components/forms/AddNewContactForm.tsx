'use client'

import { addContact } from "@/app/actions/contacts/addContact.action";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { allowedPlatformsWithIcons } from "@/constant/statics";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(
        addContact,
        {
            platform: "",
            url: ""
        } as any
    )

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new contact has been added.",
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
                <Label htmlFor="platform">Platform</Label>
                <Select
                    disabled={isPending}
                    name="platform"
                    required
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Contact Platforms</SelectLabel>
                            {allowedPlatformsWithIcons.map((e, index) =>
                                <SelectItem value={e.name} key={index}><e.icon /> {e.name}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="url">URL</Label>
                <Input
                    name="url"
                    type="text"
                    placeholder="Enter URL"
                    id="url"
                    disabled={isPending}
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
                <SubmitButton title="Add Contact" />
            </div>
        </form>
    </>;
};

export default AddNewContactForm;