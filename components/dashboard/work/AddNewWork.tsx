import AddNewWorkForm from "@/components/forms/AddNewWorkForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewWork = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-base md:text-xl font-semibold">Add New Work</h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new work experience to your portfolio. You can add a job title, company name, and dates of employment.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewWorkForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewWork;