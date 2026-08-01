import { readDB, writeDB, nowISO, safeExpert, publicSession } from "@/lib/db";
import { processQueue } from "@/lib/assignment";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return Response.json({ error: "Missing sessionId" }, { status: 400 });

  const db = await readDB();
  let session = db.sessions.find((s) => s.id === sessionId);
  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });

  processQueue(db);
  await writeDB(db);
  session = db.sessions.find((s) => s.id === sessionId);

  const expert = session.expertId ? db.experts.find((e) => e.id === session.expertId) : null;
  const queuePosition = db.sessions.filter((s) => s.status === "waiting" && !s.expertId).length;

  return Response.json({ session: publicSession(session, expert), queuePosition, now: nowISO() });
}
