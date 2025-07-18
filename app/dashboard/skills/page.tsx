import AddNewSkill from "@/components/dashboard/skills/AddNewSkill";
import ManageSkills from "@/components/dashboard/skills/ManageSkills";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";


export const metadata = {
    title: "Skills",
    description: "Manage your skills and expertise. Add, edit, or remove skills to keep your profile updated and showcase your abilities.",
    openGraph: {
        title: "Skills",
        description: "Manage your skills and expertise. Add, edit, or remove skills to keep your profile updated and showcase your abilities.",
    },
    twitter: {
        title: "Skills",
        description: "Manage your skills and expertise. Add, edit, or remove skills to keep your profile updated and showcase your abilities.",
    },
};


const page = async () => {
    const skills = await getUserDataDashboard(
        "/dashboard/skills",
        "skills"
    )

    return <>
        <Crumb title="Skills" />
        <TextHeader
            isDashboard
            title="Skills"
            description="Manage your skills and expertise. Add, edit, or remove skills to keep your profile updated and showcase your abilities."
        />
        <Separator className="mb-4" />
        <AddNewSkill />
        <Separator className="my-4" />
        <ManageSkills skills={skills?.skills} />
    </>;
};

export default page;