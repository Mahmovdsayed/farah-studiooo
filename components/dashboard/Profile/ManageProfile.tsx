import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user.types";
import Image from "next/image";
import UpdateProfile from "./UpdateProfile";

interface IProps {
    user: User
}

const ManageProfile = ({ user }: IProps) => {
    return <>
        <Card className="mt-4  px-0">

            {/* Profile Picture & userName and Email */}
            <CardContent>
                <div className="flex items-center justify-start gap-4">
                    <Image
                        src={user.avatar?.url || ""}
                        alt={user.name}
                        width={100}
                        height={100}
                        className="rounded-xl object-cover w-24 h-24"
                    />
                    <div className="text-start">
                        <h2 className="text-base md:text-xl font-semibold">{user.name}</h2>
                        <p className="text-xs md:text-sm my-1 text-muted-foreground">{user.email}</p>
                        <p className="text-xs md:text-sm text-muted-foreground font-semibold">
                            {user.positionName}
                        </p>
                    </div>
                </div>
            </CardContent>

            {/* About Me */}
            {user.about &&
                <>
                    <Separator />

                    <CardContent>
                        <h3 className="text-base md:text-xl font-semibold">About Me</h3>
                        <p className="text-xs md:text-sm my-1 text-muted-foreground font-medium md:w-4/6">{user?.about}</p>
                    </CardContent>
                </>
            }
        </Card>

        <Separator className="my-4" />

        <UpdateProfile user={user} />

    </>;
};

export default ManageProfile;