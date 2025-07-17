'use client'
import { updateEducation } from "@/app/actions/education/updateEducation.action";
import { educationTypes } from "@/types/education.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface IProps {
    education: educationTypes
    id: string
}
const UpdateEducationForm = ({ education, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateEducation(state, formData, id),
        {
            schoolName: education.schoolName || "",
            faculty: education.faculty || "",
            description: education.description || "",
            gpa: education.gpa || 0,
            status: education.status || "Currently Studying",
        } as any
    );

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your education has been updated.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
        }
    }, [state]);

    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title={`Update Education`}
            description={"This will update your education."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="schoolName">
                        University Name
                    </Label>
                    <Input
                        name="schoolName"
                        type="text"
                        placeholder="Enter university name"
                        id="schoolName"
                        defaultValue={education.schoolName}
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
                        defaultValue={education.faculty}
                        required
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
                        defaultValue={education.description}
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
                            defaultValue={education.gpa}
                            placeholder="Enter your GPA"
                            id="gpa"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="status">
                            Status
                        </Label>
                        <Select
                            defaultValue={education.status}
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
                {state.success && (
                    <div className="w-full">
                        <Alert className="bg-accent text-accent-foreground" variant={state.success ? "default" : "destructive"}>
                            <AlertTitle>
                                {state.success ? "Education updated successfully" : "Education update failed"}
                            </AlertTitle>
                            <AlertDescription>
                                <p>
                                    {state.success
                                        ? "Your education has been updated."
                                        : state.message}
                                </p>
                            </AlertDescription>
                        </Alert>
                    </div>
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

export default UpdateEducationForm;