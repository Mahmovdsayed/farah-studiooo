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
    if (!resume)
      return NextResponse.json({
        success: false,
        message: "No resume found for this user",
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
