import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Tools from "@/models/tools.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authenticateUser(),
    ]);

    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const tools = await Tools.find({ userID: user.id });
    const toolsCount = await Tools.countDocuments({ userID: user.id });
    if (!tools || toolsCount === 0)
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No tools found for this user , please add some tools to your account",
          tools: [],
          toolsCount: 0,
        },
      });
    return NextResponse.json({
      success: true,
      data: { tools },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch tools",
    });
  }
}
