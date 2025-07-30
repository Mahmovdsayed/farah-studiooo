import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextResponse } from "next/server";
import Message from "@/models/message.model";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const message = await Message.find();
    const messageCount = await Message.countDocuments();
    if (!message || messageCount === 0) {
      return NextResponse.json({
        success: false,
        data: { message: "No messages found", messages: [], messageCount: 0 },
      });
    }
    return NextResponse.json({
      success: true,
      data: { message },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
