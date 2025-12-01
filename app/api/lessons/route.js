import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";

export async function GET(req) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const sample = searchParams.get("sample");
    const limit = parseInt(searchParams.get("limit") || "0", 10);

    const query = sample === "true" ? { isSample: true } : {};

    let q = Lesson.find(query).select("-__v");
    if (limit > 0) q = q.limit(limit);

    const lessons = await q.sort({ createdAt: -1 }).lean();

    return Response.json(lessons, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
