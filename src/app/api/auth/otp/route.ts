import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { IPUT_STUDENT_DOMAIN } from "@/constants";

import type { Signup } from ".";
import { signupSchema } from ".";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const body = (await request.json()) as Promise<Signup>;
  const payload = signupSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const emailUsername = payload.data.studentId.toLocaleLowerCase().startsWith("tk")
    ? payload.data.studentId.toLocaleLowerCase()
    : "tk" + payload.data.studentId;

  const email = `${emailUsername}@${IPUT_STUDENT_DOMAIN}`;

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${new URL(request.url).origin}/api/auth/callback`,
    },
  });

  if (error || !data) return NextResponse.error();

  /** store email to cookie */
  cookieStore.set({
    name: "email",
    value: email,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    maxAge: 360, // 6 minutes
  });

  /** permit users access to the verify page */
  cookies().set({
    name: "verify",
    value: "pending",
    path: "/signup",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    maxAge: 120, // 2 minutes
  });

  return NextResponse.json({ message: "ok" });
}
