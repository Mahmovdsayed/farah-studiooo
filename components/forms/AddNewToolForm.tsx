'use client'

import { addTool } from "@/app/actions/tools/addTools.action";
import { use, useActionState, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewToolForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [proficiency, setProficiency] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const [state, formAction] = useActionState(
        addTool,
        {
            success: false,
            message: "",
        }
    )
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new tool has been added.",
                duration: 3000,
                position: "top-center",
            });
            formRef.current?.reset();
            setProficiency("");
        } else if (state.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        });
    }

    return <>
        <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="name">Tool Name</Label>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter tool name"
                    id="name"
                    autoComplete="off"
                    disabled={isPending}
                    required
                    maxLength={50}
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
            <div className="flex flex-col items-center gap-2 md:flex-row-reverse md:justify-start">
                <SubmitButton
                    title="Tool" />
            </div>
        </form>
    </>;
};

export default AddNewToolForm;