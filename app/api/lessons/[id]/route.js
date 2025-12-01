import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    console.log("Fetching lesson with id:", id);
    
    const lesson = await Lesson.findById(id).select("-__v").lean();

    if (!lesson) {
      console.log("Lesson not found for id:", id);
      return Response.json({ error: "Lesson not found" }, { status: 404 });
    }

    console.log("Found lesson:", lesson.title);
    return Response.json(lesson, { status: 200 });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
