import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/Helpers/helpers";
import { Course } from "@/types/course.types";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import DeleteCourse from "./DeleteCourse";
import UpdateCourseForm from "@/components/forms/UpdateCourseForm";

interface IProps {
    courses: Course[];
}
const ManageCourses = ({ courses }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Courses</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your courses, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 px-3">
                {
                    courses?.map((course: Course) => (
                        <Card className="bg-zinc-50 dark:bg-secondary py-4 px-0" key={course._id}>
                            <CardHeader className="px-3">
                                <div>
                                    <span className="text-xs text-muted-foreground font-medium">{formatDate(String(course.date))}</span>
                                    <h3 className="text-sm md:text-xl font-semibold">{course.title}</h3>
                                    <Link href={course.certificateURL} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                        View Certificate <LinkIcon size={16} />
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <p className="text-xs text-muted-foreground font-medium">{course.description}</p>
                            </CardContent>
                            <CardFooter className="w-full px-3 flex-col items-center justify-between gap-2">
                                <UpdateCourseForm course={course} id={course._id || ""} />
                                <DeleteCourse id={course._id || ""} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>
        </Card>
    </>;
};

export default ManageCourses;