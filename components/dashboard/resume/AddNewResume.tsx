import AddNewResumeForm from "@/components/forms/AddNewResumeForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewResume = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-base md:text-xl font-semibold">Add New Resume</h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new resume to your portfolio. You can add a title, URL.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewResumeForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewResume;