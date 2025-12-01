import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const lesson = await Lesson.findById(id).select("-__v").lean();

    if (!lesson) {
      return Response.json({ error: "Lesson not found" }, { status: 404 });
    }

    return Response.json(lesson, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
