'use client'
import { deleteMessage } from "@/app/actions/messages/deleteMessage.action";
import { markAsRead } from "@/app/actions/messages/markAsRead.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/Helpers/helpers";
import { MessageType } from "@/types/messages.types";
import { IconStatusChange } from "@tabler/icons-react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    messages: MessageType[]
}
const ManageMessages = ({ messages }: IProps) => {
    const handleRouter = (url: string) => {
        window.open(url, "_blank");
    }

    const [loading, setLoading] = useState(false)
    const handleMarkAsRead = async (id: string) => {
        try {
            setLoading(true)
            const msgRes = await markAsRead(id)
            setLoading(false)
            toast.success(msgRes.message, {
                duration: 3000

            })
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong", {
                duration: 3000

            })
        }
    }


    const handleDeleteMessage = async (id: string) => {
        try {
            setLoading(true)
            const msgRes = await deleteMessage(id)
            setLoading(false)
            toast.success(msgRes.message, {
                duration: 3000
            })
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong", {
                duration: 3000
            })
        }
    }


    return <>
        <div className="grid grid-cols-1 gap-3">
            {[...messages]
                .sort((a, b) => {
                    if (a.isRead !== b.isRead) {
                        return a.isRead ? 1 : -1;
                    }
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                .map((msg: MessageType) => (
                    <Card className={msg.isRead ? "bg-zinc-50 dark:bg-black" : "bg-card"} key={msg._id}>
                        <CardHeader className="px-3">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col items-start">
                                    <h2 className="font-semibold">{msg.name}</h2>
                                    {/* <p className="text-sm text-muted-foreground">{msg.email}</p> */}
                                </div>
                                <div>
                                    <Badge className="bg-amber-400">
                                        <IconStatusChange />
                                        {msg.isRead ? "Already read" : "Not read yet"}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
                                <Button className="w-full lg:w-fit" onClick={() => handleRouter(`tel:${msg.phone}`)}>Contact Via Phone</Button>
                                <Button className="w-full lg:w-fit" onClick={() => handleRouter(`mailto:${msg.email}`)}>Contact Via Email</Button>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="px-3">
                            <p className="text-lg font-medium mt-3">{msg.subject}</p>
                            <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line">{msg.message}</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap w-full items-center gap-4">
                            {
                                msg.isRead ? null :
                                    <Button disabled={loading} onClick={() => handleMarkAsRead(msg._id)} className="w-full lg:w-fit">Mark as {msg.isRead ? "Unread" : "Read"}</Button>
                            }
                            <Button disabled={loading} onClick={() => handleDeleteMessage(msg._id)} className="w-full lg:w-fit" variant={"destructive"}><Trash /> Delete</Button>
                        </CardFooter>
                    </Card>
                ))}

        </div >
    </>;
};

export default ManageMessages;