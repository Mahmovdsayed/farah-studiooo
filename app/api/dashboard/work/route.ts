import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Experience from "@/models/experience.model";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authenticateUser(),
    ]);
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });
    const works = await Experience.find({ userID: user.id });
    const worksCount = await Experience.countDocuments({ userID: user.id });
    if (!works || worksCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No works found for this user , please add some works to your account",
          works: [],
          worksCount: 0,
        },
      });
    return NextResponse.json({
      success: true,
      data: { works },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch tools",
    });
  }
}
