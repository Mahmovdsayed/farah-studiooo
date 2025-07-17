"use client"

import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { addService } from "@/app/actions/services/addServices.action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const AddNewServicesForm = () => {
    const [state, formAction, isPending] = useActionState(
        addService,
        {
            title: "",
            description: "",
        } as any
    )
    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your new service has been added.",
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state])
    return <>
        <form action={formAction} className="flex flex-col gap-4">
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
                />
            </div>

            {
                state.message && (
                    <div className="w-full">
                        <Alert className="bg-accent text-accent-foreground" variant={state.success ? "default" : "destructive"}>
                            <AlertTitle>
                                {state.success ? "Service added successfully" : "Failed to add service"}
                            </AlertTitle>
                            <AlertDescription>
                                <p>
                                    {state.success
                                        ? "Your new service has been added."
                                        : state.message}
                                </p>
                            </AlertDescription>
                        </Alert>

                    </div>
                )}

            <div className="w-full flex flex-col items-center gap-2 md:flex-row-reverse md:justify-start md:text-end">
                <Button
                    type="submit"
                    className="w-full md:w-fit"
                    disabled={isPending}
                >
                    <Save /> {isPending ? "Saving..." : "Save Service"}
                </Button>
            </div>
        </form>
    </>;
};

export default AddNewServicesForm;