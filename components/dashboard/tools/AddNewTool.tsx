import AddNewToolForm from "@/components/forms/AddNewToolForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewTool = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-base md:text-xl font-semibold">Add New Tool</h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new tool to your portfolio. You can add a tool name.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewToolForm />
            </CardContent>
        </Card >
    </>;
};

export default AddNewTool;