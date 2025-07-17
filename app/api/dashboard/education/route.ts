import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Education from "@/models/education.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const education = await Education.find({ userID: user.id });
    const educationCount = await Education.countDocuments({ userID: user.id });
    if (!education || educationCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No education found for this user , please add some education to your account",
          education: [],
          educationCount: 0,
        },
      });

    return NextResponse.json({
      success: true,
      data: { education },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch education",
    });
  }
}
