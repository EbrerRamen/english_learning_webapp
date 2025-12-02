import { connectDB } from "@/lib/db";
import Progress from "@/models/Progress";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    const query = { user: userId };
    if (lessonId) query.lesson = lessonId;

    const list = await Progress.find(query).populate("lesson", "title").lean();

    return Response.json(list, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(req) {
  await connectDB();

  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const body = await req.json();
    const { lessonId, completed = false, lastAccessed, score = 0 } = body || {};

    if (!lessonId) {
      return Response.json({ error: "lessonId is required" }, { status: 400 });
    }

    const update = {
      completed,
      lastAccessed: lastAccessed ? new Date(lastAccessed) : new Date(),
      score,
    };

    const progress = await Progress.findOneAndUpdate(
      { user: userId, lesson: lessonId },
      { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return Response.json(progress, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
