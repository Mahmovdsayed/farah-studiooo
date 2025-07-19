'use client'

import { deleteTool } from "@/app/actions/tools/deleteTool.action";
import DialogContainer from "@/components/layout/DialogContainer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    id: string
    name: string
}
const DeleteTool = ({ id, name }: IProps) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)

    const deleteToolAction = async () => {
        try {
            setloading(true)
            await deleteTool(id)
            setloading(false)
            toast.success("Tool deleted successfully", {
                description: "Your Tool has been deleted.",
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
            title={`Delete Tool: ${name}`}
            description={"This will delete your tool."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Trash />}
            mainButtonTitle="Delete"
            variant={"destructive"}
        >
            <p className="text-base font-medium text-muted-foreground">Are you sure you want to delete this tool?<br /><strong>Please Note :</strong> This action cannot be undone.</p>
            <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={deleteToolAction}
            ><Trash /> {loading ? "Deleting..." : "Delete Now"}</Button>
        </DialogContainer>
    </>;
};

export default DeleteTool;