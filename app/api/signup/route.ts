import { signUpShcema } from "@/libs/validation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: unknown = await req.json();

  const result = signUpShcema.safeParse(data);
  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
}
