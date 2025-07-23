import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Contact from "@/models/contacts.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const contacts = await Contact.find({ userID: user.id });
    const contactCount = await Contact.countDocuments({ userID: user.id });
    if (!contacts || contactCount === 0) {
      return NextResponse.json({
        success: false,
        data: {
          message:
            "No contacts found for this user, please add some contacts to your account",
          contacts: [],
          contactCount: 0,
        },
      });
    }
    return NextResponse.json({
      success: true,
      data: { contacts },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
