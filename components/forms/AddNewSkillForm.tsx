'use client'

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { addSkill } from "@/app/actions/skills/addNewSkill.action";
import SubmitButton from "../SubmitButton";



const AddNewSkillForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [proficiency, setProficiency] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const [state, formAction] = useActionState(
        addSkill,
        {
            success: false,
            message: "",
        }
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message, {
                description: "Your new skill has been added.",
                duration: 3000,
                position: "top-center",
            });
            formRef.current?.reset();
            setProficiency("");
        } else if (state.message) {
            toast.error(state.message, {
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        });
    };

    return (
        <form
            ref={formRef}
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter skill name"
                    id="name"
                    autoComplete="off"
                    disabled={isPending}
                    required
                    minLength={2}
                    maxLength={50}
                />
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:gap-2">
                <div className="flex-1 space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                        name="category"
                        type="text"
                        placeholder="Enter skill category"
                        id="category"
                        required
                        minLength={2}
                        disabled={isPending}
                        maxLength={50}
                    />
                </div>

                <div className="flex-1 space-y-2">
                    <Label htmlFor="proficiency">Proficiency</Label>
                    <Select
                        required
                        value={proficiency}
                        onValueChange={setProficiency}
                        name="proficiency"
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
                    <input type="hidden" name="proficiency" value={proficiency} />
                </div>
            </div>

            {state?.message && !state.success && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex flex-col items-center gap-2 md:flex-row-reverse md:justify-start">
                <SubmitButton title="Skill" />
            </div>
        </form>
    );
};

export default AddNewSkillForm;