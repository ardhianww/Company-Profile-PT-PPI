import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Incoming login request:", { email, password });

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.admin.findUnique({ where: { email } });
    console.log("User from DB:", user);

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("Incorrect password");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token);
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
