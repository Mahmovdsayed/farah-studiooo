'use client'

import { addResume } from "@/app/actions/resume/addResume.acttion";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewResumeForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        addResume,
        {
            title: "",
            resumeURL: "",
        } as any
    )

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new resume has been added.",
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
        <form action={formAction} ref={formRef} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="title">
                    Title
                </Label>
                <Input
                    name="title"
                    disabled={isPending}
                    type="text"
                    placeholder="Enter course title"
                    id="title"
                    required
                />
            </div>
            <div>
                <Label htmlFor="resumeURL">
                    Resume URL
                </Label>
                <Input
                    name="resumeURL"
                    disabled={isPending}
                    type="url"
                    placeholder="Enter your resume URL"
                    id="resumeURL"
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
                <SubmitButton title="Resume" />
            </div>
        </form>
    </>;
};

export default AddNewResumeForm;