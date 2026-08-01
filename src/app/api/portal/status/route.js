import { readDB, writeDB } from "@/lib/db";
import { processQueue } from "@/lib/assignment";

export async function POST(req) {
  const body = await req.json();
  const { expertId, online } = body || {};
  if (!expertId) return Response.json({ error: "Missing expertId" }, { status: 400 });

  const db = await readDB();
  const expert = db.experts.find((e) => e.id === expertId);
  if (!expert) return Response.json({ error: "Expert not found" }, { status: 404 });

  expert.online = !!online;
  if (!online) {
    expert.busy = false;
  } else {
    processQueue(db);
  }
  await writeDB(db);

  return Response.json({
    expert: { id: expert.id, name: expert.name, online: expert.online, busy: expert.busy },
  });
}
