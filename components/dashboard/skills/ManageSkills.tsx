import UpdateSkillForm from "@/components/forms/UpdateSkillForm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { skillsTypes } from "@/types/skills.types";
import DeleteSkill from "./DeleteSkill";

interface IProps {
    skills: skillsTypes[]

}
const ManageSkills = ({ skills }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Skills</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your skills, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-3">
                {
                    skills?.map((skill: skillsTypes) => (
                        <Card className="bg-zinc-50 dark:bg-secondary px-0" key={skill._id}>
                            <CardHeader className="px-3">
                                <h3 className="text-base md:text-xl font-semibold">{skill.name}</h3>
                            </CardHeader>
                            <CardContent className="px-3">
                                <p className="text-sm text-muted-foreground font-medium">Category: <strong>{skill.category}</strong></p>
                                <p className="text-sm text-muted-foreground font-medium">Proficiency: <strong>{skill.proficiency}</strong></p>
                            </CardContent>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <UpdateSkillForm skills={skill} id={skill._id || ""} />
                                <DeleteSkill id={skill._id || ""} name={skill.name || ""} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>
        </Card>
    </>;
};

export default ManageSkills;