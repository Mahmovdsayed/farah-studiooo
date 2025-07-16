import { User } from "@/types/user.types";
import { Button } from "../ui/button";
import { AlertCircleIcon, Upload } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import DialogContainer from "../layout/DialogContainer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconFile } from "@tabler/icons-react";
import { updateAvatar } from "@/app/actions/profile/updateAvatar.action";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface IProps {
    avatar: User['avatar']

}
const ProfileImageForm = ({ avatar }: IProps) => {
    const [open, setopen] = useState(false)
    const [state, formAction, isPending] = useActionState(
        updateAvatar,
        avatar as any
    )
    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message, {
                description: "Your profile picture has been updated.",
                duration: 3000,
                position: "top-center",
            });
        }
    }, [state]);

    return <>
        <DialogContainer
            open={open}
            setOpen={setopen}
            title="Change Profile Picture"
            description="This will update your profile picture."
            mainButtonClassName="w-full md:w-fit bg-accent text-accent-foreground hover:bg-accent/80"
            mainButtonIcon={<Upload />}
            mainButtonTitle="Change Profile Picture"
        >
            <form action={formAction} className="flex flex-col gap-4 overflow-hidden">
                <div>
                    {/* preview Image */}
                    {avatar?.url && (
                        <div className="w-full flex items-center justify-center">
                            <img
                                src={avatar?.url}
                                alt="avatar"
                                className=" rounded-xl object-cover"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <Label>
                        Profile Picture
                    </Label>
                    <Input
                        placeholder="Change Profile Picture"
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept="image/*"
                    />
                </div>
                {state.message && (
                    <div className="w-full">
                        <Alert className="bg-accent text-accent-foreground" variant={state.success ? "default" : "destructive"}>
                            <AlertCircleIcon />
                            <AlertTitle>
                                {state.success ? "Profile picture updated successfully" : "Profile picture update failed"}
                            </AlertTitle>
                            <AlertDescription>
                                <p>
                                    {state.success
                                        ? "Your profile picture has been updated."
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
                    <IconFile />  {isPending ? "Uploading..." : "Change Now"}
                </Button>
            </form>
        </DialogContainer>
    </>;
};

export default ProfileImageForm;