'use client'
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
interface IProps {
    title: string
}

const SubmitButton = ({ title }: IProps) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full md:w-fit"
            disabled={pending}
        >
            <Save /> {pending ? "Saving..." : `Save ${title}`}
        </Button>
    );
};

export default SubmitButton;