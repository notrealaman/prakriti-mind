import { readDB } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body || {};

  const db = await readDB();
  const expert = db.experts.find(
    (e) => e.email.toLowerCase() === (email || "").toLowerCase() && e.password === password
  );

  if (!expert) {
    return Response.json({ error: "Invalid email or password" }, { status: 401 });
  }

  return Response.json({
    expert: {
      id: expert.id,
      name: expert.name,
      email: expert.email,
      specialty: expert.specialty,
      online: expert.online,
      busy: expert.busy,
    },
  });
}
