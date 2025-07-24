'use client'

import { addCourse } from "@/app/actions/courses/addCourse.action";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewCourseForm = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        addCourse,
        {
            title: "",
            description: "",
            date: Date,
            certificateURL: "",
        } as any
    )

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new course has been added.",
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
                />
            </div>
            <div>
                <Label htmlFor="description">
                    Description
                </Label>
                <Textarea
                    rows={5}
                    name="description"
                    placeholder="your course description here (optional)."
                    id="description"
                    disabled={isPending}
                />
            </div>
            <div>
                <Label htmlFor="date">
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={isPending}
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                        >
                            {date ? formatDate(date) : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}

                            id="date"
                            captionLayout="dropdown"
                            onSelect={(selectedDate: Date | undefined) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                    setOpen(false);
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
                <Input
                    required
                    type="date"
                    id="date"
                    className="hidden"
                    name="date"
                    defaultValue={
                        date
                            ? getLocalDateStringg(date)
                            : ""
                    }
                />
            </div>
            <div>
                <Label htmlFor="certificateURL">
                    Certificate URL
                </Label>
                <Input
                    type="url"
                    id="certificateURL"
                    name="certificateURL"
                    placeholder="Enter certificate URL"
                    disabled={isPending}
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
                <SubmitButton title="Course" />
            </div>
        </form>
    </>;
};

export default AddNewCourseForm;