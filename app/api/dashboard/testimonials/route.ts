import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Testimonial from "@/models/testimonials.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });
    const testimonials = await Testimonial.find();
    const testimonialsCount = await Testimonial.countDocuments();
    if (!testimonials || testimonialsCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No testimonials found for this user , please add some testimonials to your account",
          testimonials: [],
          testimonialsCount: 0,
        },
      });
    return NextResponse.json({
      success: true,
      data: { testimonials },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
