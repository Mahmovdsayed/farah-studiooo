'use client'

import { tools } from "@/types/tools.types";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DialogContainer from "../layout/DialogContainer";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { updateTool } from "@/app/actions/tools/updateTool.action";

interface IProps {
    tools: tools,
    id: string
}
const UpdateToolForm = ({ tools, id }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        (state: any, formData: FormData) => updateTool(state, formData, id),
        {
            name: tools.name || "",
        } as any
    );

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message, {
                description: "Your tool has been updated.",
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
            title={`Update Tool: ${tools.name}`}
            description={"This will update your tool."}
            mainButtonClassName="w-full"
            mainButtonIcon={<Edit />}
            mainButtonTitle="Edit"
            variant="outline"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    <Label htmlFor="name">
                        Tool Name
                    </Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter tool name"
                        disabled={isPending}
                        id="name"
                        defaultValue={tools.name}
                        required
                    />
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
        </DialogContainer>
    </>;
};

export default UpdateToolForm;