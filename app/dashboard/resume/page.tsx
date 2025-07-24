import AddNewResume from "@/components/dashboard/resume/AddNewResume";
import ManageResume from "@/components/dashboard/resume/ManageResume";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

// metaData 
export const metadata = {
    title: "Resume",
    description: "Manage your resume, add new sections, update existing ones, and delete those you no longer need.",
    openGraph: {
        title: "Resume",
        description: "Manage your resume, add new sections, update existing ones, and delete those you no longer need.",
    },
    twitter: {
        title: "Resume",
        description: "Manage your resume, add new sections, update existing ones, and delete those you no longer need.",
    },
};

const page = async () => {
    const resume = await getUserDataDashboard("/dashboard/resume", "resume");
    return <>
        <Crumb title="Resume" />
        <TextHeader
            isDashboard
            title="Resume"
            description="Manage your resume, add new sections, update existing ones, and delete those you no longer need."
        />
        <Separator className="mb-4" />

        <AddNewResume />
        <Separator className="my-4" />
        {resume?.resume ? (
            <ManageResume resume={resume.resume} />
        ) : (
            <p className="text-sm text-muted-foreground text-center">
                You have not added any resume yet. Please add a new resume to manage it.
            </p>
        )}
    </>;
};

export default page;