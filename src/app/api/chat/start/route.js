import { readDB, writeDB, genId, nowISO, safeExpert } from "@/lib/db";
import { processQueue } from "@/lib/assignment";

export async function POST(req) {
  const body = await req.json();
  const { type, userName, scheduledFor } = body || {};

  if (type !== "instant" && type !== "scheduled") {
    return Response.json({ error: "Invalid session type" }, { status: 400 });
  }

  const db = await readDB();
  const session = {
    id: genId("ses"),
    type,
    userId: genId("usr"),
    userName: (userName || "Guest").trim() || "Guest",
    expertId: null,
    status: type === "instant" ? "waiting" : "scheduled",
    scheduledFor: type === "scheduled" ? scheduledFor || null : null,
    createdAt: nowISO(),
    startedAt: null,
    endedAt: null,
  };
  db.sessions.push(session);

  processQueue(db);
  await writeDB(db);

  const current = db.sessions.find((s) => s.id === session.id);
  const expert = current.expertId ? db.experts.find((e) => e.id === current.expertId) : null;
  const queuePosition = db.sessions.filter((s) => s.status === "waiting" && !s.expertId).length;

  return Response.json({
    sessionId: session.id,
    status: current.status,
    expert: safeExpert(expert),
    scheduledFor: current.scheduledFor,
    queuePosition,
  });
}
