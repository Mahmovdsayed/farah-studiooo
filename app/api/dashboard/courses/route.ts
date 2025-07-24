import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Course from "@/models/course.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const course = await Course.find({ userID: user.id });
    const courseCount = await Course.countDocuments({ userID: user.id });
    if (!course || courseCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No courses found for this user, please add some courses to your account",
          courses: [],
          courseCount: 0,
        },
      });

    return NextResponse.json({
      success: true,
      data: { course },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
