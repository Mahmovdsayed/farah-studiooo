import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Resume from "@/models/resume.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const resume = await Resume.findOne({ userID: user.id });
    const resumeCount = await Resume.countDocuments({ userID: user.id });

    if (!resume || resumeCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No resume found for this user, please add your resume to your account",
          resumeCount,
        },
      });

    return NextResponse.json({
      success: true,
      data: { resume },
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch education",
    });
  }
}
