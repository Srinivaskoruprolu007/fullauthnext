import { getDataFromToken } from "@/helpers/getDataFromToke";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById({ _id: userId }).select(
      "-password -isAdmin -isVerified"
    );
    return NextResponse.json({message: "User found", data: user});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
