'use client'
import { deleteWork } from "@/app/actions/work/deleteWork.action";
import DialogContainer from "@/components/layout/DialogContainer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    id: string

}
const DeleteWork = ({ id }: IProps) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)

    const deleteWorkAction = async () => {
        try {
            setloading(true)
            await deleteWork(id)
            setloading(false)
            toast.success("Work deleted successfully", {
                description: "Your work has been deleted.",
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
            title={`Delete Work Experience`}
            description={"This will delete your work experience."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Trash />}
            mainButtonTitle="Delete"
            variant={"destructive"}
        >
            <p className="text-base font-medium text-muted-foreground">Are you sure you want to delete this work experience?<br /><strong>Please Note :</strong> This action cannot be undone.</p>
            <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={deleteWorkAction}
            ><Trash /> {loading ? "Deleting..." : "Delete Now"}</Button>
        </DialogContainer>
    </>;
};

export default DeleteWork;