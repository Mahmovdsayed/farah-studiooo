import AddNewServicesForm from "@/components/forms/AddNewServicesForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewServices = () => {
    return <>
        <Card className="mt-4 py-4 px-0">
            <CardHeader>
                <h3 className="text-base md:text-xl font-semibold">Add New Service</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new service to your portfolio. You can add a service name, and description.
                </p>
            </CardHeader>
            <CardContent>
                <AddNewServicesForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewServices;