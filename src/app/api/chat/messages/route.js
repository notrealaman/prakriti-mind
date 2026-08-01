import { readDB } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const after = searchParams.get("after");

  if (!sessionId) return Response.json({ error: "Missing sessionId" }, { status: 400 });

  const db = await readDB();
  const session = db.sessions.find((s) => s.id === sessionId);
  const messages = db.messages
    .filter((m) => m.sessionId === sessionId && (!after || m.timestamp > after))
    .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));

  return Response.json({
    messages,
    session: session ? { status: session.status, expertId: session.expertId } : null,
  });
}
