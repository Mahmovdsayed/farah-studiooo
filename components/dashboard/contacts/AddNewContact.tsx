import AddNewContactForm from "@/components/forms/AddNewContactForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewContact = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-lg font-medium">Add New Contact</h2>
                <p className="text-sm text-muted-foreground">
                    Add a new contact to your dashboard. You can add a contact name, email, phone number, and platform.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewContactForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewContact;