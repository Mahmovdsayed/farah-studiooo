import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { educationTypes } from "@/types/education.types";
import DeleteEducation from "./DeleteEducation";
import UpdateEducationForm from "@/components/forms/UpdateEducationForm";

interface IProps {
    education: educationTypes[]
}
const ManageEducation = ({ education }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Education</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your education, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 px-3">
                {
                    education?.map((education: educationTypes) => (
                        <Card className="bg-zinc-50 dark:bg-secondary py-4 px-0" key={education._id}>
                            <CardHeader className="px-3">
                                <div>
                                    <h3 className="text-sm md:text-xl font-semibold">{education.schoolName}</h3>
                                    <CardDescription className="text-xs text-muted-foreground font-medium">{education.faculty}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <p className="text-xs md:text-sm text-muted-foreground font-medium">{education.description}</p>
                                <Separator className="mt-2" />
                                <div className="flex flex-col items-start justify-start gap-2 mt-2">
                                    <p className="text-xs md:text-sm  font-medium">GPA: <strong>{education.gpa}</strong></p>
                                    <p className="text-xs md:text-sm  font-medium">Status: <strong>{education.status}</strong></p>
                                    <p className="text-xs md:text-sm  font-medium">From: <strong>{new Date(education.from).toLocaleDateString()}</strong></p>
                                    <p className="text-xs md:text-sm  font-medium">To: <strong>{new Date(education.to).toLocaleDateString()}</strong></p>
                                </div>
                            </CardContent>
                            <CardFooter className="w-full px-3 flex-col items-center justify-between gap-2">
                                <UpdateEducationForm education={education} id={education._id || ""} />
                                <DeleteEducation id={education._id || ""} />
                            </CardFooter>
                        </Card>
                    ))

                }
            </CardContent>
        </Card >
    </>;
};

export default ManageEducation;