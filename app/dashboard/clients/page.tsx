import AddNewClient from "@/components/dashboard/clients/AddNewClient";
import ManageClients from "@/components/dashboard/clients/ManageClients";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

export const metadata = {
    title: "Clients",
    description: "Here you can manage your clients. You can add, edit, delete, and view clients. You can also assign clients to projects and services.",
    openGraph: {
        title: "Clients",
        description: "Here you can manage your clients. You can add, edit, delete, and view clients. You can also assign clients to projects and services.",
    },
    twitter: {
        title: "Clients",
        description: "Here you can manage your clients. You can add, edit, delete, and view clients. You can also assign clients to projects and services.",
    },
};

const page = async () => {
    const clients = await getUserDataDashboard(
        "/dashboard/clients",
        "clients"
    );
    return <>
        <Crumb title="Clients" />
        <TextHeader
            isDashboard
            title="Clients"
            description="Here you can manage your clients. You can add, edit, delete, and view clients. You can also assign clients to projects and services."
        />
        <Separator className="mb-4" />
        <AddNewClient />
        <Separator className="my-4" />
        {clients?.clientCount === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
                {clients?.message}
            </p>
        ) : (
            <ManageClients clients={clients?.clients} />
        )}
    </>
}

export default page;