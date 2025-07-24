import AddNewCourseForm from "@/components/forms/AddNewCourseForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewCourse = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-lg font-medium">Add New Course</h2>
                <p className="text-sm text-muted-foreground">
                    Add a new course to your dashboard. You can add a course title, description, and other details.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewCourseForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewCourse;