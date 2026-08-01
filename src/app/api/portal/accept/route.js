import { readDB, writeDB, nowISO } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { sessionId, expertId } = body || {};
  if (!sessionId || !expertId) {
    return Response.json({ error: "Missing sessionId or expertId" }, { status: 400 });
  }

  const db = await readDB();
  const expert = db.experts.find((e) => e.id === expertId);
  const session = db.sessions.find((s) => s.id === sessionId);

  if (!expert) return Response.json({ error: "Expert not found" }, { status: 404 });
  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });
  if (session.status !== "scheduled" || session.expertId) {
    return Response.json({ error: "This session is not available" }, { status: 400 });
  }
  if (!expert.online) return Response.json({ error: "You must be online to accept a session" }, { status: 400 });
  if (expert.busy) return Response.json({ error: "Finish your current session first" }, { status: 400 });

  session.expertId = expert.id;
  session.status = "active";
  session.startedAt = nowISO();
  expert.busy = true;
  expert.sessionsServed = (expert.sessionsServed || 0) + 1;
  await writeDB(db);

  return Response.json({ ok: true });
}
