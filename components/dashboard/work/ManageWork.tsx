import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { workTypes } from "@/types/work.types";
import DeleteWork from "./DeleteWork";
import UpdateWorkForm from "@/components/forms/UpdateWorkForm";

interface IProps {
    works: workTypes[]
}
const ManageWork = ({ works }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Work</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your work experiences, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4  md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 px-3">
                {
                    works?.map((work: workTypes) => (
                        <Card className="bg-zinc-50 dark:bg-secondary px-0" key={work._id}>
                            <CardHeader className="px-3">
                                <div className="flex items-center gap-2">
                                    <img src={work.companyImage.url} alt={work.companyName} className="w-14 h-14 rounded-xl object-cover " />
                                    <div>
                                        <h3 className="text-base text-wrap md:text-xl font-semibold">{work.positionName} at <strong className="capitalize">{work.companyName}</strong></h3>
                                        <p className="text-sm font-medium text-muted-foreground">{work.employmentType}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <p className="text-sm font-medium text-muted-foreground">{work.description}</p>
                                <p className="text-sm font-medium text-muted-foreground mt-4">
                                    {new Date(work.from).toLocaleDateString()} - {work.current ? "Present" : new Date(work.to).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <UpdateWorkForm work={work} id={work._id || ""} />
                                <DeleteWork id={work._id || ""} />
                            </CardFooter>

                        </Card>
                    ))
                }

            </CardContent>

        </Card>
    </>;
};

export default ManageWork;