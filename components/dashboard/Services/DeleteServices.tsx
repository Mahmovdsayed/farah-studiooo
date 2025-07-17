'use client'

import { deleteServices } from "@/app/actions/services/deleteServices.action";
import DialogContainer from "@/components/layout/DialogContainer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    id: string
    title: string
}
const DeleteServices = ({ id, title }: IProps) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)

    const deleteService = async () => {
        try {
            setloading(true)
            await deleteServices(id)
            setloading(false)
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
            title={`Delete Service: ${title}`}
            description={"This will delete your service."}
            mainButtonClassName="w-1/2"
            mainButtonIcon={<Trash />}
            mainButtonTitle="Delete"
            variant={"destructive"}
        >
            <p className="text-base font-medium text-muted-foreground">Are you sure you want to delete this service?<br /><strong>Please Note :</strong> This action cannot be undone.</p>
            <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={deleteService}
            ><Trash /> {loading ? "Deleting..." : "Delete Now"}</Button>
        </DialogContainer>
    </>;
};

export default DeleteServices;