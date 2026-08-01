import { readDB, writeDB, nowISO, freeExpert } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { sessionId } = body || {};
  if (!sessionId) return Response.json({ error: "Missing sessionId" }, { status: 400 });

  const db = await readDB();
  const session = db.sessions.find((s) => s.id === sessionId);
  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });

  if (session.status !== "ended") {
    session.status = "ended";
    session.endedAt = nowISO();
    if (session.expertId) freeExpert(db, session.expertId);
  }
  await writeDB(db);

  return Response.json({ ok: true });
}
