import AddNewServices from "@/components/dashboard/Services/AddNewServices";
import ManageServices from "@/components/dashboard/Services/ManageServices";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";
import { servicesTypes } from "@/types/services.types";

export const metadata = {
    title: "Services",
    description: "Manage your services and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    openGraph: {
        title: "Services",
        description: "Manage your services and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    },
    twitter: {
        title: "Services",
        description: "Manage your services and add new ones to your portfolio , update existing ones, and delete those you no longer offer.",
    },
};


const page = async () => {
    const services = await getUserDataDashboard(
        "/dashboard/services",
        "services"
    )

    return <>
        <Crumb title="Services" />
        <TextHeader
            title="Services"
            description="Manage your services and add new ones to your portfolio , update existing ones, and delete those you no longer offer."
            isDashboard
        />
        <Separator className="mb-4" />
        <AddNewServices />
        <Separator className="my-4" />
        <ManageServices services={services?.services} />
    </>;
};

export default page;