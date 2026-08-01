import { readDB, writeDB } from "@/lib/db";
import { processQueue } from "@/lib/assignment";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const expertId = searchParams.get("expertId");
  if (!expertId) return Response.json({ error: "Missing expertId" }, { status: 400 });

  const db = await readDB();
  const expert = db.experts.find((e) => e.id === expertId);
  if (!expert) return Response.json({ error: "Expert not found" }, { status: 404 });

  processQueue(db);
  await writeDB(db);

  const mySessions = db.sessions
    .filter((s) => s.expertId === expertId && (s.status === "active" || s.status === "scheduled"))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const waitingSessions = db.sessions
    .filter((s) => s.status === "waiting" && !s.expertId)
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

  const scheduledSessions = db.sessions
    .filter((s) => s.status === "scheduled" && !s.expertId)
    .sort((a, b) => (a.scheduledFor < b.scheduledFor ? -1 : 1));

  const lastMessage = (sessionId) => {
    const msgs = db.messages.filter((m) => m.sessionId === sessionId);
    if (!msgs.length) return null;
    return msgs[msgs.length - 1];
  };

  return Response.json({
    expert: {
      id: expert.id,
      name: expert.name,
      specialty: expert.specialty,
      online: expert.online,
      busy: expert.busy,
      sessionsServed: expert.sessionsServed || 0,
    },
    mySessions: mySessions.map((s) => ({
      id: s.id,
      type: s.type,
      status: s.status,
      userName: s.userName,
      scheduledFor: s.scheduledFor,
      startedAt: s.startedAt,
      createdAt: s.createdAt,
      lastMessage: lastMessage(s.id),
    })),
    waitingSessions: waitingSessions.map((s) => ({ id: s.id, userName: s.userName, createdAt: s.createdAt })),
    scheduledSessions: scheduledSessions.map((s) => ({ id: s.id, userName: s.userName, scheduledFor: s.scheduledFor })),
  });
}
