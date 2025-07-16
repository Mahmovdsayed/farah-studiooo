'use client'

import { User } from "@/types/user.types";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useActionState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { AlertCircleIcon, ChevronDownIcon, Edit } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { updateProfile } from "@/app/actions/profile/updateProfile.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { formatDate, getLocalDateStringg } from "@/functions/formatDate";
import ProfileImageForm from "./ProfileImageForm";

interface IProps {
    user: User
}

const UpdateProfileForm = ({ user }: IProps) => {

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(() => {
        return user.birthday ? new Date(user.birthday) : undefined;
    });

    const [state, formAction, isPending] = useActionState(
        updateProfile,
        user as any
    )

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your profile has been updated.",
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);

    return <>

        <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
            <div>
                <Label htmlFor="email" >
                    Email
                </Label>
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    id="email"
                    autoComplete="email"
                    defaultValue={user.email}
                    required
                />
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your Name"
                        id="name"
                        autoComplete="name"
                        defaultValue={user.name}
                        required
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <Input
                        name="username"
                        className="w-full"
                        type="text"
                        placeholder="Enter your Username"
                        id="username"
                        autoComplete="username"
                        defaultValue={user.username}
                        required
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="phone" >
                        Phone
                    </Label>
                    <Input
                        name="phone"
                        className="w-full"
                        type="text"
                        placeholder="Enter your Phone"
                        id="phone"
                        autoComplete="phone"
                        defaultValue={user.phone}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="positionName">
                        Position Name
                    </Label>
                    <Input
                        name="positionName"
                        className="w-full"
                        type="text"
                        placeholder="Enter your Position Name"
                        id="positionName"
                        autoComplete="positionName"
                        defaultValue={user.positionName}
                    />

                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                    <Label htmlFor="country">
                        Country
                    </Label>
                    <Input
                        name="country"
                        className="w-full"
                        type="text"
                        placeholder="Enter your Country"
                        id="country"
                        autoComplete="country"
                        defaultValue={user.country}
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="city">
                        City
                    </Label>
                    <Input
                        name="city"
                        className="w-full"
                        type="text"
                        placeholder="Enter your City"
                        id="city"
                        autoComplete="city"
                        defaultValue={user.city}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="birthday">Birthday</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="birthday"
                            className="w-full justify-between font-normal"
                            type="button"
                        >
                            {date
                                ? formatDate(date)
                                : user.birthday
                                    ? formatDate(user.birthday)
                                    : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date || (user.birthday ? new Date(user.birthday) : undefined)}
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
                    type="date"
                    id="birthday"
                    className="hidden"
                    name="birthday"
                    defaultValue={
                        date
                            ? getLocalDateStringg(date)
                            : user.birthday
                                ? getLocalDateStringg(new Date(user.birthday))
                                : ""
                    }
                />
            </div>
            <div className="w-full">
                <Label htmlFor="about">About</Label>
                <Textarea
                    name="about"
                    id="about"
                    placeholder="Tell us a little about yourself"
                    defaultValue={user.about}
                    rows={5}
                />

            </div>

            {
                state.message && (
                    <div className="w-full">
                        <Alert className="bg-accent text-accent-foreground" variant={state.success ? "default" : "destructive"}>
                            <AlertCircleIcon />
                            <AlertTitle>
                                {state.success ? "Profile updated successfully" : "Profile update failed"}
                            </AlertTitle>
                            <AlertDescription>
                                <p>
                                    {state.success
                                        ? "Your profile has been updated."
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
                    <Edit /> {isPending ? "Updating..." : "Update Profile"}
                </Button>
                <ProfileImageForm avatar={user.avatar} />
            </div>


        </form>
    </>;
};

export default UpdateProfileForm;