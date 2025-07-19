import AddNewTool from "@/components/dashboard/tools/AddNewTool";
import ManageTools from "@/components/dashboard/tools/ManageTools";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

export const metadata = {
    title: "Tools",
    description: "Manage your tools and technologies that you use in your projects.",
    openGraph: {
        title: "Tools",
        description: "Manage your tools and technologies that you use in your projects.",
    },
    twitter: {
        title: "Tools",
        description: "Manage your tools and technologies that you use in your projects.",
    },
};

const page = async () => {
    const tools = await getUserDataDashboard(
        "/dashboard/tools",
        "tools"
    )
    return <>
        <Crumb title="Tools" />
        <TextHeader
            isDashboard
            title="Tools"
            description="Manage your tools and technologies that you use in your projects."
        />
        <Separator className="mb-4" />
        <AddNewTool />
        <Separator className="my-4" />
        <ManageTools tools={tools?.tools} />

    </>
}
export default page;