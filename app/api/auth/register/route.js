import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "Email already used" }, { status: 400 });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return Response.json(
      { message: "User created successfully", user: { name, email } },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
