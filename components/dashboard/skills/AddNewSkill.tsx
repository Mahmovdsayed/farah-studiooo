import AddNewSkillForm from "@/components/forms/AddNewSkillForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddNewSkill = () => {
    return <>
        <Card className="mt-4 px-0">
            <CardHeader className="px-3">
                <h2 className="text-base md:text-xl font-semibold">Add New Skill</h2>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Add a new skill to your portfolio. You can add a skill name, and description.
                </p>
            </CardHeader>
            <CardContent className="px-3">
                <AddNewSkillForm />
            </CardContent>
        </Card>
    </>;
};

export default AddNewSkill;