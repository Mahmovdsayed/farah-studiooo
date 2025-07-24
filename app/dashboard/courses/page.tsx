import AddNewCourse from "@/components/dashboard/courses/AddNewCourse";
import ManageCourses from "@/components/dashboard/courses/ManageCourses";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { getUserDataDashboard } from "@/lib/fetcher";
import { Separator } from "@radix-ui/react-separator";

const page = async () => {
    const course = await getUserDataDashboard('/dashboard/courses', 'courses');
    return <>
        <Crumb title="Courses" />
        <TextHeader
            isDashboard
            title="Courses"
            description="Manage your courses, add new ones, update existing ones, and delete those you no longer offer."
        />
        <Separator className="mb-4" />
        <AddNewCourse />
        <Separator className="my-4" />
        <ManageCourses courses={course?.course} />
    </>
}

export default page;