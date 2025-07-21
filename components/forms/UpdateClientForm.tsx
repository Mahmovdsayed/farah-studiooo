'use client'

import { updateClient } from "@/app/actions/clients/updateClient.action";
import { clientTypes } from "@/types/clients.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Textarea } from "../ui/textarea";

interface IProps {
    client: clientTypes
    id: string
}
const UpdateClientForm = ({ client, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateClient(state, formData, id),
        {
            name: client.name || "",
            description: client.description || "",
            url: client.url || "",
        } as any
    );

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your client has been updated.",
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
            title={`Update Client: ${client.name}`}
            description={"This will update your client."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="name">Client Name</Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter client name"
                        id="name"
                        disabled={isPending}
                        required
                        defaultValue={client.name}
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
                        defaultValue={client.url}
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
                        defaultValue={client.description || ""}
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
export default UpdateClientForm;
