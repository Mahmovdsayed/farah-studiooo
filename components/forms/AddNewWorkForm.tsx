'use client'
import { addWork } from "@/app/actions/work/addWork.action";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import SubmitButton from "../SubmitButton";

const AddNewWorkForm = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [openEndDate, setOpenEndDate] = React.useState(false)
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)
    const formRef = useRef<HTMLFormElement>(null);
    const [current, setCurrent] = React.useState(false);

    const types = [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Freelance",
        "Remote",
        "Temporary",
        "Casual",
        "Volunteer",
        "Self-Employed",
        "Apprenticeship",
        "Other",
    ]

    const [state, formAction, isPending] = useActionState(
        addWork,
        {
            companyName: "",
            positionName: "",
            description: "",
            from: Date,
            to: Date,
            companyImage: File,
            current: false,
            employmentType: "Full-time"
        } as any
    )

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new work has been added.",
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
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        name="companyName"
                        disabled={isPending}
                        type="text"
                        placeholder="Enter company name"
                        id="companyName"
                        required
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="positionName">Position Name</Label>
                    <Input
                        name="positionName"
                        disabled={isPending}
                        type="text"
                        placeholder="Enter position name"
                        id="positionName"
                        required
                    />
                </div>
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
                                disabled={current || isPending}
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
                        disabled={current || isPending}
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
            <div className="w-full">
                <Label htmlFor="employmentType">
                    Employment Type
                </Label>
                <Select
                    disabled={isPending}
                    required
                    name="employmentType"
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Employment Type</SelectLabel>
                            {types.map((ty: string, index: number) =>
                                <SelectItem key={index} value={ty}>{ty}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full">
                <Label htmlFor="current">Current</Label>
                <div className="flex items-center gap-3">
                    <Checkbox
                        id="current"
                        checked={current}
                        onCheckedChange={(val) => setCurrent(Boolean(val))}
                    />
                    <Label htmlFor="current">I am currently employed here</Label>
                </div>
                <input type="hidden" name="current" value={current.toString()} />
            </div>
            <div>
                <Label htmlFor="companyImage">
                    Company Image
                </Label>
                <Input
                    disabled={isPending}
                    name="companyImage"
                    type="file"
                    placeholder="Upload Company image"
                    id="companyImage"
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
                <SubmitButton title="Work Experience" />
            </div>
        </form>
    </>;
};

export default AddNewWorkForm;