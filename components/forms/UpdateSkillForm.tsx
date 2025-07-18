'use client'

import { skillsTypes } from "@/types/skills.types";
import { useActionState, useEffect, useState } from "react";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { updateSkill } from "@/app/actions/skills/updateSkill.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface IProps {
    skills: skillsTypes;
    id: string
}
const UpdateSkillForm = ({ skills, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateSkill(state, formData, id),
        {
            name: skills.name || "",
            category: skills.category || "",
            proficiency: skills.proficiency || "Beginner",
        } as any
    );
    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message, {
                description: "Your service has been updated.",
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
            title={`Update Skill: ${skills.name}`}
            description={"This will update your skill."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="name">
                        Skill Name
                    </Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter skill name"
                        disabled={isPending}
                        id="name"
                        defaultValue={skills.name}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="category">
                        Category
                    </Label>
                    <Input
                        name="category"
                        type="text"
                        placeholder="Enter skill category"
                        id="category"
                        defaultValue={skills.category}
                        disabled={isPending}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="proficiency">
                        Proficiency
                    </Label>
                    <Select
                        required
                        name="proficiency"
                        defaultValue={skills.proficiency}
                        disabled={isPending}
                    >
                        <SelectTrigger aria-label="Proficiency" className="w-full">
                            <SelectValue placeholder="Select a proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Proficiency</SelectLabel>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
        </DialogContainer >
    </>;
};

export default UpdateSkillForm;