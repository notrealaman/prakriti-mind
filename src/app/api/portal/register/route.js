import { readDB, writeDB, genId, nowISO } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, specialty } = body || {};

  if (!name || !name.trim()) return Response.json({ error: "Name is required" }, { status: 400 });
  if (!email || !email.trim() || !email.includes("@")) {
    return Response.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (!password || password.length < 6) {
    return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const db = await readDB();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = db.experts.find((e) => e.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return Response.json({ error: "An expert with this email already exists" }, { status: 409 });
  }

  const expert = {
    id: genId("exp"),
    name: name.trim(),
    email: normalizedEmail,
    password,
    specialty: specialty?.trim() || "General Support",
    online: false,
    busy: false,
    sessionsServed: 0,
    joinedAt: nowISO(),
  };
  db.experts.push(expert);
  await writeDB(db);

  return Response.json({
    expert: {
      id: expert.id,
      name: expert.name,
      email: expert.email,
      specialty: expert.specialty,
      online: expert.online,
      busy: expert.busy,
      sessionsServed: 0,
    },
  });
}
