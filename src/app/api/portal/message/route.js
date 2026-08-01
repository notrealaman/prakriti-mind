import { readDB, writeDB, genId, nowISO } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { sessionId, text } = body || {};
  if (!sessionId || !text || !text.trim()) {
    return Response.json({ error: "Missing sessionId or text" }, { status: 400 });
  }

  const db = await readDB();
  const session = db.sessions.find((s) => s.id === sessionId);
  if (!session) return Response.json({ error: "Session not found" }, { status: 404 });
  if (session.status !== "active") {
    return Response.json({ error: "Session is not active" }, { status: 400 });
  }

  db.messages.push({
    id: genId("msg"),
    sessionId,
    sender: "expert",
    text: text.trim().slice(0, 2000),
    timestamp: nowISO(),
  });
  await writeDB(db);

  return Response.json({ ok: true });
}
