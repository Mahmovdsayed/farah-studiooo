import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";

const page = async () => {
    return <>
        <Crumb title="Analytics" />
        <TextHeader
            isDashboard
            title="Analytics"
            description="View your analytics, track your performance, and gain insights into your activities."
        />
        <Separator className="mb-4" />
        <h2 className="text-center text-lg md:text-xl font-semibold text-muted-foreground">
            This page is under construction. Please check back later for updates.
        </h2>
    </>;
};

export default page;