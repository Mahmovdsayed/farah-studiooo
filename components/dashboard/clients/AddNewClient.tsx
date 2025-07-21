import AddNewClientForm from "@/components/forms/AddNewClientForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewClient = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-base md:text-xl font-semibold">Add New Client</h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new client to your dashboard. You can add a client name, logo, and description.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewClientForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewClient;