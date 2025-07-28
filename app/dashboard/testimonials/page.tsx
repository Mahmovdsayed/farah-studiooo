import ManageTestimonials from "@/components/dashboard/testimonials/ManageTestimonials";
import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";
import { getUserDataDashboard } from "@/lib/fetcher";


export const metadata = {
    title: "Testimonials",
    description: "Here you can manage your testimonials. You can delete, and view testimonials.",
    openGraph: {
        title: "Testimonials",
        description: "Here you can manage your testimonials. You can delete, and view testimonials.",
    },
    twitter: {
        title: "Testimonials",
        description: "Here you can manage your testimonials. You can delete, and view testimonials.",
    },
};


const page = async () => {
    const testimonials = await getUserDataDashboard("/dashboard/testimonials", "testimonials");
    return <>
        <Crumb title="Testimonials" />
        <TextHeader
            isDashboard
            title="Testimonials"
            description="Here you can manage your testimonials. You can delete, and view testimonials."
        />
        <Separator className="mb-4" />
        {testimonials?.testimonialsCount === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
                {testimonials?.message}
            </p>
        ) : (
            <ManageTestimonials testimonials={testimonials?.testimonials} />
        )}

    </>;
};

export default page;