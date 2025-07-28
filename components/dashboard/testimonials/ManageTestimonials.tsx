'use client'
import { deleteTestimonial } from "@/app/actions/testimonials/deleteTestimoial.action";
import { updateTestimonial } from "@/app/actions/testimonials/updateTestimonial.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { testimonials } from "@/types/testimonials.types";
import { Edit, Star, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
    testimonials: testimonials[]
}
const ManageTestimonials = ({ testimonials }: IProps) => {
    const [loading, setLoading] = useState(false)
    const updateFeedBack = async (id: any) => {
        try {
            setLoading(true)
            await updateTestimonial(id)
            setLoading(false)
            toast.success(`FeedBack updated Successfully`, {
                duration: 3000,
                position: "top-center",
            });
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong", {
                description: "Please try again later.",
                duration: 3000,
                position: "top-center",
            });
        }
    }

    const deleteFeedback = async (id: any) => {
        try {
            setLoading(true)
            await deleteTestimonial(id)
            setLoading(false)
            toast.success(`FeedBack deleted Successfully`, {
                duration: 3000,
                position: "top-center",
            });
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong", {
                description: "Please try again later.",
                duration: 3000,
                position: "top-center",
            });
        }

    }

    return <>
        {
            <Card className="w-full mt-4 px-0">
                <CardHeader className="px-3">
                    <h3 className="text-base md:text-xl font-semibold">Manage Testimonials</h3>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground md:w-4/6">
                        Here you can manage your testimonials, edit or delete them.
                    </p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2 px-3">
                    {testimonials?.map((testimonial) => (
                        <Card className="bg-zinc-50 dark:bg-secondary px-0" key={Number(testimonial._id)}>
                            <CardHeader className="px-3">
                                <h3 className="text-base md:text-xl font-semibold">{testimonial?.name}</h3>
                                <p className="text-sm font-medium text-muted-foreground">{testimonial?.position}</p>
                                <p className="text-xs text-muted-foreground font-medium">{testimonial?.message}</p>
                                <div className="flex items-center gap-1 mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < Number(testimonial?.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-center justify-between gap-2 px-3 w-full">
                                <Button
                                    type="button"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={() => updateFeedBack(testimonial._id)}
                                ><Edit /> {testimonial.isPublic ? "Unapprove" : "Approve"}</Button>
                                <Button
                                    type="button"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={() => deleteFeedback(testimonial._id)}
                                    variant={"destructive"}
                                ><Trash /> Delete</Button>

                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

        }
    </>;
};

export default ManageTestimonials;