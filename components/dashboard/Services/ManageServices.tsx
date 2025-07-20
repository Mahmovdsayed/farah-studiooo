'use client'
import UpdateServicesForm from "@/components/forms/UpdateServicesForm";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { servicesTypes } from "@/types/services.types";
import DeleteServices from "./DeleteServices";

interface IProps {
    services: servicesTypes[]
}
const ManageServices = ({ services }: IProps) => {
    return <>
        <Card className="w-full mt-4  px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Services</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your services, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-3">

                {
                    services?.map((service: servicesTypes) => (
                        <Card className="bg-zinc-50 dark:bg-secondary  px-0" key={service._id}>
                            <CardHeader className="px-3">
                                <h3 className="text-base md:text-xl font-semibold">{service.title}</h3>
                            </CardHeader>
                            <CardContent className="px-3">
                                <p className="text-sm text-muted-foreground font-medium">{service.description}</p>
                            </CardContent>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <UpdateServicesForm services={service} id={service._id || ""} />
                                <DeleteServices id={service._id || ""} title={service.title || ""} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </CardContent>

        </Card>
    </>;
};

export default ManageServices;