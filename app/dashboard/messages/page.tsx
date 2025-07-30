import ManageMessages from "@/components/dashboard/messages/ManageMessages";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";

const page = async () => {
    const messages = await getUserDataDashboard('/chat/all', 'messages')
    return <>
        <Crumb title="Messages" />
        <TextHeader
            isDashboard
            title="Messages"
            description="Here you can find all the messages from your clients."
        />
        <Separator className="mb-4" />
        {messages?.messageCount === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
                {messages?.message}
            </p>
        ) : (
            <ManageMessages messages={messages?.message} />
        )}

    </>;
};

export default page;