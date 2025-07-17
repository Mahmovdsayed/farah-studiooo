import AddNewEducation from "@/components/dashboard/education/AddNewEducation";
import ManageEducation from "@/components/dashboard/education/ManageEducation";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

export const metadata = {
    title: "Education",
    description: "Manage your education and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    openGraph: {
        title: "Education",
        description: "Manage your education and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    },
    twitter: {
        title: "Education",
        description: "Manage your education and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    },
};

const page = async () => {
    const education = await getUserDataDashboard(
        "/dashboard/education",
        "education"
    )
    return <>
        <Crumb title="Education" />
        <TextHeader
            title="Education"
            description="Manage your education and add new ones to your portfolio , update existing ones, and delete those you no longer offer."
            isDashboard
        />
        <Separator className="mb-4" />
        <AddNewEducation />
        <Separator className="my-4" />
        <ManageEducation education={education?.education} />
    </>;
};

export default page;