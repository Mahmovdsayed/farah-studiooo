'use client'

import { updateResume } from "@/app/actions/resume/updateResume.action";
import { Resume } from "@/types/resume.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface IProps {
    id: string;
    resume: Resume;
}
const UpdateResumeForm = ({ id, resume }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateResume(state, formData, id),
        {
            title: resume?.title || "",
            resumeURL: resume?.resumeURL || "",
        } as any
    );

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message, {
                description: "Your resume has been updated.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
        } else if (state.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);
    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title={`Update Resume`}
            description={"This will update your resume."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
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
                        defaultValue={resume?.title}
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
                        defaultValue={resume?.resumeURL}
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

export default UpdateResumeForm;