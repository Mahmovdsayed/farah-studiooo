import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { contactType } from "@/types/contact.types";
import Link from "next/link";
import DeleteContact from "./DeleteContact";
import UpdateContactForm from "@/components/forms/UpdateContactForm";

interface IProps {
    contacts: contactType[];
}
const ManageContacts = ({ contacts }: IProps) => {
    return <>
        <Card className="w-full mt-4. px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Contacts</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your contacts, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-3">
                {
                    contacts?.map((contact: contactType) => (
                        <Card className="bg-zinc-50 dark:bg-secondary  px-0" key={contact._id}>
                            <CardHeader className="px-3">
                                <h3 className="text-base md:text-xl font-semibold capitalize">{contact.platform}</h3>
                            </CardHeader>
                            <CardContent className="px-3">
                                <Link href={contact.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-wrap text-blue-600">{contact.url}</Link>
                            </CardContent>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <UpdateContactForm contact={contact} id={contact._id || ""} />
                                <DeleteContact id={contact._id || ""} name={contact.platform || ""} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>
        </Card >
    </>;
};

export default ManageContacts;