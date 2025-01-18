import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define the decoded token type
interface DecodedToken extends JwtPayload {
  id: string; // assuming the decoded token contains the user's id as a string
}

export const getDataFromToken = (request: NextRequest): string | undefined => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

    return decodedToken.id; // returning the id from the decoded token
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
};
