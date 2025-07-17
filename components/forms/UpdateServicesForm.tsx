'use client'

import { servicesTypes } from "@/types/services.types";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import DialogContainer from "../layout/DialogContainer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateService } from "@/app/actions/services/updateServices.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


interface IProps {
    services: servicesTypes;
    id: string
}
const UpdateServicesForm = ({ services, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateService(state, formData, id),
        {
            title: services.title || "",
            description: services.description || "",
        } as any
    );


    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your service has been updated.",
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
            title={`Update Service: ${services.title}`}
            description={"This will update your service."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="title">
                        Service Name
                    </Label>
                    <Input
                        name="title"
                        type="text"
                        placeholder="Enter service name"
                        id="title"
                        required
                        defaultValue={services.title}
                    />
                </div>
                <div>
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        name="description"
                        placeholder="Type your service description here."
                        id="description"
                        rows={5}
                        required
                        defaultValue={services.description}
                    />
                </div>
                {state.success && (
                    <div className="w-full">
                        <Alert className="bg-accent text-accent-foreground" variant={state.success ? "default" : "destructive"}>
                            <AlertTitle>
                                {state.success ? "Service updated successfully" : "Service update failed"}
                            </AlertTitle>
                            <AlertDescription>
                                <p>
                                    {state.success
                                        ? "Your service has been updated."
                                        : state.message}
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>
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
        </DialogContainer >
    </>;
};

export default UpdateServicesForm;