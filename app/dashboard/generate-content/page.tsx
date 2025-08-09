import Crumb from "@/components/layout/Crumb";
import TextHeader from "@/components/layout/TextHeader";
import { Separator } from "@/components/ui/separator";

const page = () => {
    return <>
        <Crumb title="Generate Content" />
        <TextHeader
            title="Generate Content"
            description="Effortlessly create compelling content with our AI-powered generator. From blog posts to marketing copy, get high-quality text in an instant."
            isDashboard
        />
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Blog Post</h3>
                <p className="text-muted-foreground">Generate a blog post about a given topic.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Social Media Post</h3>
                <p className="text-muted-foreground">Generate a social media post about a given topic.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Product Description</h3>
                <p className="text-muted-foreground">Generate a product description about a given topic.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">Generate an email about a given topic.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 my-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Ad Copy</h3>
                <p className="text-muted-foreground">Generate ad copy for a given product or service.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Website Content</h3>
                <p className="text-muted-foreground">Generate content for a website page.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Video Script</h3>
                <p className="text-muted-foreground">Generate a video script for a given topic.</p>
            </div>
            <div className="relative bg-accent flex flex-col rounded-xl border p-4">
                <h3 className="text-xl font-semibold">Press Release</h3>
                <p className="text-muted-foreground">Generate a press release for a given announcement.</p>
            </div>
        </div>
        
        
    </>;
};

export default page;