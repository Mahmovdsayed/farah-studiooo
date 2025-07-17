'use client'

import { deleteEducation } from "@/app/actions/education/deleteEducation.action";
import DialogContainer from "@/components/layout/DialogContainer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    id: string
}
const DeleteEducation = ({ id }: IProps) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)

    const deleteEducationFunc = async () => {
        try {
            setloading(true)
            await deleteEducation(id)
            setloading(false)
            toast.success("Education deleted successfully", {
                description: "Your education has been deleted.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
        } catch (error) {
            setloading(false)
            setopen(false)
            toast.error("Something went wrong", {
                description: "Please try again later.",
                duration: 3000,
                position: "top-center",
            });
        }
    }

    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title={`Delete Education`}
            description={"This will delete your Education."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Trash />}
            mainButtonTitle="Delete"
            variant={"destructive"}
        >
            <p className="text-base font-medium text-muted-foreground">Are you sure you want to delete this education?<br /><strong>Please Note :</strong> This action cannot be undone.</p>
            <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={deleteEducationFunc}
            ><Trash /> {loading ? "Deleting..." : "Delete Now"}</Button>
        </DialogContainer>
    </>;
};

export default DeleteEducation;