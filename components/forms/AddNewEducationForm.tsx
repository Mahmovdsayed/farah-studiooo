'use client'

import { ChevronDownIcon, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import React, { useActionState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import { Calendar } from "../ui/calendar";
import { addEducation } from "@/app/actions/education/addEducation.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewEducationForm = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [openEndDate, setOpenEndDate] = React.useState(false)
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        addEducation,
        {
            schoolName: "",
            faculty: "",
            description: "",
            gpa: 0,
            status: "Currently Studying",
            from: Date,
            to: Date,
            schoolImage: File,
        } as any
    )

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new education has been added.",
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
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="schoolName">
                    University Name
                </Label>
                <Input
                    name="schoolName"
                    disabled={isPending}
                    type="text"
                    placeholder="Enter university name"
                    id="schoolName"
                    required
                />
            </div>
            <div>
                <Label htmlFor="faculty">
                    Faculty
                </Label>
                <Input
                    name="faculty"
                    type="text"
                    placeholder="Enter faculty name"
                    id="faculty"
                    required
                    disabled={isPending}
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
                />
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="gpa">
                        GPA
                    </Label>
                    <Input
                        name="gpa"
                        type="number"
                        min="0"
                        max="4"
                        step="0.01"
                        placeholder="Enter your GPA"
                        id="gpa"
                        disabled={isPending}
                        required
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="status">
                        Status
                    </Label>
                    <Select
                        disabled={isPending}
                        required
                        name="status"
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Education Status</SelectLabel>
                                <SelectItem value="Currently Studying">Currently Studying</SelectItem>
                                <SelectItem value="Graduated">Graduated</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="from">
                        Start Date
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                disabled={isPending}
                                variant="outline"
                                id="from"
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

                                id="from"
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
                        id="from"
                        className="hidden"
                        name="from"
                        defaultValue={
                            date
                                ? getLocalDateStringg(date)
                                : ""
                        }
                    />

                </div>
                <div className="w-full">
                    <Label htmlFor="to">
                        End Date
                    </Label>
                    <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                disabled={isPending}
                                id="to"
                                className="w-full justify-between font-normal"
                            >
                                {endDate ? endDate.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                id="to"
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setEndDate(date)
                                    setOpenEndDate(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <Input
                        type="date"
                        required
                        id="to"
                        className="hidden"
                        name="to"
                        defaultValue={
                            endDate
                                ? getLocalDateStringg(endDate)
                                : ""
                        }
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="schoolImage">
                    University Image
                </Label>
                <Input
                    disabled={isPending}
                    name="schoolImage"
                    type="file"
                    placeholder="Upload University image"
                    id="schoolImage"
                    accept="image/*"
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
                <SubmitButton title="Education" />
            </div>
        </form>
    </>;
};

export default AddNewEducationForm;