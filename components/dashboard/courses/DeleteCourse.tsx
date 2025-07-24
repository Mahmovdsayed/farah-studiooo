'use client'

import { deleteCourse } from "@/app/actions/courses/deleteCourse.action";
import DialogContainer from "@/components/layout/DialogContainer";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    id: string;
}
const DeleteCourse = ({ id }: IProps) => {
    const [open, setopen] = useState(false)
    const [loading, setloading] = useState(false)

    const DeleteCourseFunc = async () => {
        try {
            setloading(true)
            await deleteCourse(id)
            setloading(false)
            toast.success("Course deleted successfully", {
                description: "Your course has been deleted.",
                duration: 3000,
                position: "top-center",
            });
            setopen(false)
        } catch (error) {
            setloading(false)
            setopen(false)
            toast.error("Failed to delete course", {
                description: "There was an error deleting your course.",
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
            <p className="text-base font-medium text-muted-foreground">Are you sure you want to delete this course?<br /><strong>Please Note :</strong> This action cannot be undone.</p>
            <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={DeleteCourseFunc}
            ><Trash /> {loading ? "Deleting..." : "Delete Now"}</Button>
        </DialogContainer>
    </>;
};

export default DeleteCourse;