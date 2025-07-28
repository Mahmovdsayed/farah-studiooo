
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Resume } from "@/types/resume.types";
import Link from "next/link";
import DeleteResume from "./DeleteResume";
import UpdateResumeForm from "@/components/forms/UpdateResumeForm";

interface IProps {
    resume: Resume
}
const ManageResume = ({ resume }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Resume</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your resume, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2 px-3">

                <Card className="bg-zinc-50 dark:bg-secondary px-0" key={resume?._id}>
                    <CardHeader className="px-3">
                        <h3 className="text-base md:text-xl font-semibold">{resume?.title}</h3>
                        <Link href={String(resume?.resumeURL)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wrap text-blue-600">{resume?.resumeURL}</Link>
                    </CardHeader>
                    <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                        <UpdateResumeForm resume={resume} id={resume?._id} />
                        <DeleteResume id={resume?._id} />
                    </CardFooter>
                </Card>

            </CardContent>
        </Card>
    </>;
};

export default ManageResume;