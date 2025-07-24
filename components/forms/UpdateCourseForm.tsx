'use client'

import { updateCourse } from "@/app/actions/courses/updateCourse.action";
import { Course } from "@/types/course.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { ChevronDownIcon, Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import { Calendar } from "../ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface IProps {
    course: Course
    id: string
}
const UpdateCourseForm = ({ course, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [To, setTo] = useState(false)

    const [date, setDate] = useState<Date | undefined>(() => {
        return course.date ? new Date(course.date) : undefined;
    });

    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateCourse(state, formData, id),
        {
            title: course.title,
            description: course.description,
            date: course.date,
            certificateURL: course.certificateURL,
        } as any
    );

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message, {
                description: "Your course has been updated.",
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
            title={`Update Course`}
            description={"This will update your course."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                        name="title"
                        defaultValue={course.title}
                        required
                        disabled={isPending}
                        type="text"
                        placeholder="Enter course title"
                        id="title"
                    />
                </div>
                <div>
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <Textarea
                        rows={5}
                        name="description"
                        placeholder="Type your education description here."
                        id="description"
                        disabled={isPending}
                        required
                        defaultValue={course.description}
                    />
                </div>
                <div>
                    <Label htmlFor="certificateURL">Certificate URL</Label>
                    <Input
                        name="certificateURL"
                        type="url"
                        placeholder="Enter certificate URL"
                        id="certificateURL"
                        disabled={isPending}
                        required
                        defaultValue={course.certificateURL}
                    />
                </div>
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                        type="date"
                        id="date"
                        name="date"
                        defaultValue={course.date ? getLocalDateStringg(new Date(course.date)) : ""}
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

export default UpdateCourseForm;