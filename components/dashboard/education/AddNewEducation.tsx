import AddNewEducationForm from "@/components/forms/AddNewEducationForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewEducation = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Add New Education</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new education to your portfolio. You can add a education name, and description.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewEducationForm />
            </CardContent>
        </Card >
    </>;
};

export default AddNewEducation;