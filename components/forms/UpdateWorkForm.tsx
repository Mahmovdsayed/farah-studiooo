'use client'

import { workTypes } from "@/types/work.types";
import { useActionState, useEffect, useState } from "react";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { updateWork } from "@/app/actions/work/updateWork.action";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface IProps {
    work: workTypes;
    id: string
}
const UpdateWorkForm = ({ work, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [Open, setOpen] = useState(false)
    const [currentt, setCurrentt] = useState(work.current);

    const [To, setTo] = useState(false)
    const [dateFrom, setDateFrom] = useState<Date | undefined>(() => {
        return work.from ? new Date(work.from) : undefined;
    });
    const [dateTo, setDateTo] = useState<Date | undefined>(() => {
        return work.to ? new Date(work.to) : undefined;
    });

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
        (state: any, formData: FormData) => updateWork(state, formData, id),
        {
            companyName: work.companyName,
            positionName: work.positionName,
            description: work.description,
            from: work.from,
            to: work.to,
            current: work.current,
            employmentType: work.employmentType
        } as any
    );

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your work has been updated.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
            if (typeof state.current === "boolean") {
                setCurrentt(state.current);
            }
            setCurrentt(work.current)
        }
    }, [state]);

    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title={`Update Work Experience`}
            description={"This will update your work experience."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        name="companyName"
                        disabled={isPending}
                        type="text"
                        placeholder="Enter company name"
                        id="companyName"
                        required
                        defaultValue={work.companyName}
                    />
                </div>
                <div>
                    <Label htmlFor="positionName">Position Name</Label>
                    <Input
                        name="positionName"
                        disabled={isPending}
                        type="text"
                        placeholder="Enter position name"
                        id="positionName"
                        required
                        defaultValue={work.positionName}
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
                        defaultValue={work.description}
                    />
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="w-full">
                        <Label htmlFor="from">Start Date</Label>
                        <Popover open={Open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="from"
                                    className="w-full justify-between font-normal"
                                    type="button"
                                >
                                    {dateFrom
                                        ? formatDate(dateFrom)
                                        : work.from
                                            ? formatDate(work.from)
                                            : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom || (work.from ? new Date(work.from) : undefined)}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate: Date | undefined) => {
                                        if (selectedDate) {
                                            setDateFrom(selectedDate);
                                            setOpen(false);
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Input
                            type="date"
                            id="from"
                            className="hidden"
                            name="from"
                            defaultValue={
                                dateFrom
                                    ? getLocalDateStringg(dateFrom)
                                    : work.from
                                        ? getLocalDateStringg(new Date(work.from))
                                        : ""
                            }
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="to">End Date</Label>
                        <Popover open={To} onOpenChange={setTo}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="to"
                                    disabled={currentt || isPending}
                                    className="w-full justify-between font-normal"
                                    type="button"
                                >
                                    {dateTo
                                        ? formatDate(dateTo)
                                        : work.to
                                            ? formatDate(work.to)
                                            : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateTo || (work.to ? new Date(work.to) : undefined)}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate: Date | undefined) => {
                                        if (selectedDate) {
                                            setDateTo(selectedDate);
                                            setTo(false);
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <Input
                            type="date"
                            id="to"
                            className="hidden"
                            name="to"
                            defaultValue={
                                dateTo
                                    ? getLocalDateStringg(dateTo)
                                    : work.to
                                        ? getLocalDateStringg(new Date(work.to))
                                        : ""
                            }
                        />
                    </div>
                </div>

                <div className="w-full">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select
                        disabled={isPending}
                        required
                        defaultValue={work.employmentType}
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
                            defaultChecked={currentt}
                            checked={currentt}
                            onCheckedChange={(val) => setCurrentt(Boolean(val))}
                        />
                        <Label htmlFor="current">I am currently employed here</Label>
                    </div>
                    <input type="hidden" name="current" value={currentt.toString()} />
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

export default UpdateWorkForm;