import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { tools } from "@/types/tools.types";
import DeleteTool from "./DeleteTool";
import UpdateToolForm from "@/components/forms/UpdateToolForm";

interface IProps {
    tools: tools[]
}
const ManageTools = ({ tools }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Tools</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your tools, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-3">
                {
                    tools?.map((tool: tools) => (
                        <Card className="bg-zinc-50 dark:bg-secondary px-0" key={tool._id}>
                            <CardHeader className="px-3">
                                <h3 className="text-base md:text-xl font-semibold">{tool.name}</h3>
                            </CardHeader>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <UpdateToolForm tools={tool} id={tool._id || ""} />
                                <DeleteTool id={tool._id || ""} name={tool.name || ""} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>
        </Card>
    </>;
};

export default ManageTools;