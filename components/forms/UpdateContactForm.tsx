'use client'

import { updateContact } from "@/app/actions/contacts/updateContact.action";
import { contactType } from "@/types/contact.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { allowedPlatformsWithIcons } from "@/constant/statics";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface IProps {
    contact: contactType
    id: string
}
const UpdateContactForm = ({ contact, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateContact(state, formData, id),
        {
            platform: contact.platform || "",
            url: contact.url || "",
        } as any
    );

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your Contact has been updated.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
        }
    }, [state]);

    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title={`Update Contact: ${contact.platform}`}
            description={"This will update your contact."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                        disabled={isPending}
                        name="platform"
                        defaultValue={contact.platform}
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
                        type="url"
                        placeholder="Enter URL"
                        id="url"
                        disabled={isPending}
                        required
                        defaultValue={contact.url}
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
                <Button
                    type="submit"
                    variant={"default"}
                    className="w-full "
                    disabled={isPending}
                >
                    <Edit />  {isPending ? "Updating..." : "Update Now"}
                </Button>
            </form>
        </DialogContainer>
    </>;
};
export default UpdateContactForm;
