import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import seedDB from "../../data/db.json";

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const REDIS_KEY = "prakriti:db";

function redisConfigured() {
  return !!(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL);
}

let redisClient = null;
function redis() {
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redisClient;
}

function readFile() {
  try {
    if (fs.existsSync(DB_PATH)) return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch (e) {
    // ignore corrupt file
  }
  return seedDB;
}

function writeFile(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (e) {
    // read-only filesystem (serverless) — ignore
  }
}

export async function readDB() {
  if (redisConfigured()) {
    try {
      const data = await redis().get(REDIS_KEY);
      if (data) return data;
    } catch (e) {
      // fall through to file/seed on Redis failure
    }
  }
  return readFile();
}

export async function writeDB(db) {
  if (redisConfigured()) {
    try {
      await redis().set(REDIS_KEY, db);
      return;
    } catch (e) {
      // fall through to file
    }
  }
  writeFile(db);
}

export function genId(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function nowISO() {
  return new Date().toISOString();
}

export function freeExpert(db, expertId) {
  const expert = db.experts.find((e) => e.id === expertId);
  if (expert) expert.busy = false;
}

export function safeExpert(expert) {
  if (!expert) return null;
  return { id: expert.id, name: expert.name, specialty: expert.specialty, sessionsServed: expert.sessionsServed || 0 };
}

export function publicSession(session, expert) {
  return {
    id: session.id,
    type: session.type,
    status: session.status,
    expert: safeExpert(expert),
    scheduledFor: session.scheduledFor,
    createdAt: session.createdAt,
    startedAt: session.startedAt,
  };
}
