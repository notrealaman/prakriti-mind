import { nowISO } from "@/lib/db";

export function findBestExpert(db) {
  const candidates = db.experts.filter((e) => e.online && !e.busy);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => {
    const aLoad = a.sessionsServed || 0;
    const bLoad = b.sessionsServed || 0;
    if (aLoad !== bLoad) return aLoad - bLoad;
    return a.joinedAt < b.joinedAt ? -1 : 1;
  });
  return candidates[0];
}

export function promoteDueSessions(db) {
  const now = new Date();
  let promoted = false;
  db.sessions.forEach((s) => {
    if (s.status === "scheduled" && s.scheduledFor && new Date(s.scheduledFor) <= now) {
      s.status = "waiting";
      promoted = true;
    }
  });
  return promoted;
}

export function assignNextWaiting(db) {
  const session = db.sessions.find((s) => s.status === "waiting" && !s.expertId);
  if (!session) return null;
  const expert = findBestExpert(db);
  if (!expert) return null;
  session.expertId = expert.id;
  session.status = "active";
  session.startedAt = nowISO();
  expert.busy = true;
  expert.sessionsServed = (expert.sessionsServed || 0) + 1;
  return session;
}

export function processQueue(db) {
  promoteDueSessions(db);
  const assigned = [];
  let session;
  while ((session = assignNextWaiting(db))) {
    assigned.push(session.id);
  }
  return assigned;
}
