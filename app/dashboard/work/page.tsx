import AddNewWork from "@/components/dashboard/work/AddNewWork"
import ManageWork from "@/components/dashboard/work/ManageWork"
import Crumb from "@/components/layout/Crumb"
import TextHeader from "@/components/layout/TextHeader"
import { Separator } from "@/components/ui/separator"
import { getUserDataDashboard } from "@/lib/fetcher"

export const metadata = {
    title: "Work Experience",
    description: "Manage yourwork experience and showcase your professional journey.",
    openGraph: {
        title: "Work Experience",
        description: "Manage your work experience and showcase your professional journey.",
    },
    twitter: {
        title: "Work Experience",
        description: "Manage your work experience and showcase your professional journey.",
    },
};


const page = async () => {
    const works = await getUserDataDashboard(
        "/dashboard/work",
        "work"
    )
    return <>
        <Crumb title="Work Experience" />
        <TextHeader
            isDashboard
            title="Work Experience"
            description="Manage your work experience and showcase your professional journey. Add, edit, or remove entries to keep your profile updated and highlight your career achievements."
        />
        <Separator className="mb-4" />
        <AddNewWork />
        <Separator className="my-4" />
        {works?.worksCount === 0 ? (
            <p className="text-sm text-muted-foreground text-center">{works?.message}</p>
        ) :
            <ManageWork works={works?.works} />
        })
    </>
}

export default page;