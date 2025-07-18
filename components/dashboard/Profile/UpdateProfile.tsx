import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User } from "@/types/user.types";

interface IProps {
    user: User
}
const UpdateProfile = ({ user }: IProps) => {
    return <>
        <Card className="mt-4  px-0">
            <CardHeader className="px-3">
                <h4 className="text-base md:text-xl font-semibold">Update Profile</h4>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Hi <strong>{user.name}</strong>, you can update your personal and professional details here — including your name, username, email, phone number, location, job title, birthday, and a short bio about yourself.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <UpdateProfileForm user={user} />
            </CardContent>
        </Card>
    </>;
};

export default UpdateProfile;