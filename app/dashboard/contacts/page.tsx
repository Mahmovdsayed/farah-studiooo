import AddNewContact from "@/components/dashboard/contacts/AddNewContact";
import ManageContacts from "@/components/dashboard/contacts/ManageContacts";
import Crumb from "@/components/layout/Crumb"
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

export const metadata = {
    title: "Contacts",
    description: "Here you can manage your contacts. You can add, edit, delete, and view contacts.",
    openGraph: {
        title: "Contacts",
        description: "Here you can manage your contacts. You can add, edit, delete, and view contacts.",
    },
    twitter: {
        title: "Contacts",
        description: "Here you can manage your contacts. You can add, edit, delete, and view contacts.",
    },
};

const page = async () => {
    const contact = await getUserDataDashboard("/dashboard/contacts", "contacts");
    return <>
        <Crumb title="Contacts" />
        <TextHeader
            isDashboard
            title="Contacts"
            description="Here you can manage your contacts. You can add, edit, delete, and view contacts."
        />
        <Separator className="mb-4" />
        <AddNewContact />
        <Separator className="my-4" />
        {contact?.contactCount === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
                {contact?.message}
            </p>
        ) : (
            <ManageContacts contacts={contact?.contacts} />
        )}
    </>
}
export default page;