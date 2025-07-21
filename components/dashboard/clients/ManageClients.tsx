import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { clientTypes } from "@/types/clients.types";
import Link from "next/link";
import DeleteClient from "./DeleteClient";
import UpdateClientForm from "@/components/forms/UpdateClientForm";

interface IProps {
    clients: clientTypes[]
}
const ManageClients = ({ clients }: IProps) => {
    return <>
        <Card className="w-full mt-4 px-0">
            <CardHeader className="px-3">
                <h3 className="text-base md:text-xl font-semibold">Manage Clients</h3>
                <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                    Here you can manage your clients, edit or delete them.
                </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-3">
                {
                    clients?.map((client: clientTypes) => (
                        <Card className="bg-zinc-50 dark:bg-secondary py-4 px-0" key={client._id}>
                            <CardHeader className="px-3">
                                <div>
                                    <h3 className="text-sm md:text-xl text-wrap font-semibold">{client.name}</h3>
                                    <Link href={client.url} target="_blank" className="text-xs md:text-sm text-wrap text-muted-foreground font-medium">{client.url}</Link>
                                </div>
                            </CardHeader>
                            <CardContent className="px-3">
                                <div>
                                    <img src={client.clientImage.url} alt={client.name} className="w-24 h-24 object-cover rounded-md mb-2" />

                                </div>
                                {client.description &&
                                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{client.description}</p>
                                }
                            </CardContent>
                            <CardFooter className="w-full px-3 flex-col items-center justify-between gap-2">
                                <UpdateClientForm id={client._id || ""} client={client} />
                                <DeleteClient id={client._id || ""} name={client.name || ""} />
                            </CardFooter>
                        </Card>
                    ))

                }
            </CardContent>
        </Card>
    </>;
};

export default ManageClients;