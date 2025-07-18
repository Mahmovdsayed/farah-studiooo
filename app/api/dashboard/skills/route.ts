import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Skills from "@/models/skills.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const skills = await Skills.find({ userID: user.id });
    const skillsCount = await Skills.countDocuments({ userID: user.id });
    if (!skills || skillsCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No skills found for this user , please add some skills to your account",
          skills: [],
          skillsCount: 0,
        },
      });
    return NextResponse.json({
      success: true,
      data: { skills },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
}
