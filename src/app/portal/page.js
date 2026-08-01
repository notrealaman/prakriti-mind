"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const PORTAL_KEY = "prakriti_expert_session";

export default function PortalPage() {
  const [expert, setExpert] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(PORTAL_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        // ignore invalid stored session
      }
    }
    return null;
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [registerName, setRegisterName] = useState("");
  const [registerSpecialty, setRegisterSpecialty] = useState("");

  const [online, setOnline] = useState(false);
  const [served, setServed] = useState(0);
  const [mySessions, setMySessions] = useState([]);
  const [waitingSessions, setWaitingSessions] = useState([]);
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesRef = useRef(null);
  const lastTsRef = useRef("");

  const loadMessages = useCallback(async (sid, after) => {
    const url = `/api/chat/messages?sessionId=${sid}${after ? `&after=${encodeURIComponent(after)}` : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.messages || [];
  }, []);

  useEffect(() => {
    if (!expert) return;
    let cancelled = false;

    async function poll() {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/portal/sessions?expertId=${expert.id}`);
        const data = await res.json();
        if (cancelled) return;
        setOnline(data.expert.online);
        setServed(data.expert.sessionsServed || 0);
        setMySessions(data.mySessions || []);
        setWaitingSessions(data.waitingSessions || []);
        setScheduledSessions(data.scheduledSessions || []);

        if (selected) {
          const stillActive = (data.mySessions || []).find(
            (s) => s.id === selected.id && s.status === "active"
          );
          if (!stillActive) setSelected(null);
        }
      } catch (e) {
        // ignore
      }

      if (selected) {
        try {
          const url = `/api/chat/messages?sessionId=${selected.id}${
            lastTsRef.current ? `&after=${encodeURIComponent(lastTsRef.current)}` : ""
          }`;
          const r = await fetch(url);
          const d = await r.json();
          const msgs = d.messages || [];
          if (cancelled) return;
          if (msgs.length) {
            setMessages((prev) => {
              const existing = new Set(prev.map((m) => m.id));
              const fresh = msgs.filter((m) => !existing.has(m.id));
              return [...prev, ...fresh];
            });
            lastTsRef.current = msgs[msgs.length - 1].timestamp;
          }
        } catch (e) {
          // ignore
        }
      }
    }

    poll();
    const id = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [expert, selected]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, selected]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/portal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setLoginError("Invalid email or password.");
      return;
    }
    const data = await res.json();
    setExpert(data.expert);
    setOnline(data.expert.online);
    sessionStorage.setItem(PORTAL_KEY, JSON.stringify(data.expert));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/portal/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email,
        password,
        specialty: registerSpecialty,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoginError(data.error || "Could not create account.");
      return;
    }
    setExpert(data.expert);
    setOnline(data.expert.online);
    sessionStorage.setItem(PORTAL_KEY, JSON.stringify(data.expert));
  }

  async function toggleOnline() {
    const next = !online;
    setOnline(next);
    const res = await fetch("/api/portal/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expertId: expert.id, online: next }),
    });
    const data = await res.json();
    setOnline(data.expert.online);
  }

  async function acceptSession(session) {
    const res = await fetch("/api/portal/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.id, expertId: expert.id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Could not accept session.");
    }
  }

  async function selectSession(session) {
    if (session.status !== "active") return;
    setSelected(session);
    setMessages([]);
    lastTsRef.current = "";
    const msgs = await loadMessages(session.id, "");
    setMessages(msgs);
    lastTsRef.current = msgs.length ? msgs[msgs.length - 1].timestamp : "";
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || !selected) return;
    setInput("");
    try {
      await fetch("/api/portal/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selected.id, text }),
      });
      const msgs = await loadMessages(selected.id, "");
      setMessages(msgs);
      lastTsRef.current = msgs.length ? msgs[msgs.length - 1].timestamp : "";
    } catch (e) {
      alert("Could not send message.");
    }
  }

  async function endSession() {
    if (!selected) return;
    try {
      await fetch("/api/chat/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selected.id }),
      });
    } catch (e) {
      // ignore
    }
    setSelected(null);
    setMessages([]);
  }

  function logout() {
    sessionStorage.removeItem(PORTAL_KEY);
    setExpert(null);
    setEmail("");
    setPassword("");
    setOnline(false);
    setSelected(null);
    setMessages([]);
  }

  function formatTime(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  }

  if (!expert) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">PM</span>
              </div>
              <span className="font-semibold text-xl text-dark">
                Prakriti <span className="text-primary">Mind</span>
              </span>
            </div>
            <h1 className="text-center text-2xl font-bold text-dark mb-1">Experts Portal</h1>
            <p className="text-center text-sm text-muted mb-6">Sign in to manage your sessions</p>

            <div className="flex rounded-full bg-gray-100 p-1 mb-6">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  authMode === "login" ? "bg-white text-primary shadow" : "text-muted hover:text-dark"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  authMode === "register" ? "bg-white text-primary shadow" : "text-muted hover:text-dark"
                }`}
              >
                Join as Expert
              </button>
            </div>

            {authMode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="you@prakritimind.org"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="••••••••"
                  />
                </div>
                {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="Dr. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Specialty</label>
                  <input
                    type="text"
                    value={registerSpecialty}
                    onChange={(e) => setRegisterSpecialty(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="e.g. Anxiety & Stress, Depression..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="you@prakritimind.org"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    placeholder="At least 6 characters"
                  />
                </div>
                {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-dark transition"
                >
                  Create Account
                </button>
              </form>
            )}

            {authMode === "login" && (
              <div className="mt-6 p-4 rounded-xl bg-gray-50 text-xs text-muted">
                <p className="font-semibold text-dark mb-2">Demo credentials:</p>
                <p>priya@prakritimind.org / expert123</p>
                <p>rahul@prakritimind.org / expert123</p>
                <p>ananya@prakritimind.org / expert123</p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">PM</span>
            </div>
            <div>
              <p className="font-semibold text-dark text-sm leading-tight">{expert.name}</p>
              <p className="text-xs text-muted">{expert.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${online ? "bg-green-500" : "bg-gray-300"}`} />
              <span className="text-sm font-medium text-dark">{online ? "Online" : "Offline"}</span>
              <button
                onClick={toggleOnline}
                className={`relative w-11 h-6 rounded-full transition-colors ${online ? "bg-green-500" : "bg-gray-300"}`}
                aria-label="Toggle availability"
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${online ? "left-5.5" : "left-0.5"}`}
                  style={{ left: online ? "22px" : "2px" }}
                />
              </button>
            </div>
            <Link href="/" className="text-sm text-muted hover:text-primary transition">View Site</Link>
            <button onClick={logout} className="text-sm text-red-500 hover:text-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-dark">{mySessions.filter((s) => s.status === "active").length}</p>
            <p className="text-xs text-muted">Active Sessions</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-accent">{waitingSessions.length}</p>
            <p className="text-xs text-muted">Waiting (auto-assigned)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-primary">{scheduledSessions.length}</p>
            <p className="text-xs text-muted">Upcoming Requests</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-secondary">{served}</p>
            <p className="text-xs text-muted">Sessions Served</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-6">
          {/* Left: session lists */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-primary text-white font-semibold text-sm">My Active Sessions</div>
              <div className="max-h-64 overflow-y-auto">
                {mySessions.filter((s) => s.status === "active").length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted">No active sessions</p>
                ) : (
                  mySessions
                    .filter((s) => s.status === "active")
                    .map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectSession(s)}
                        className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition ${
                          selected?.id === s.id ? "bg-primary-lighter" : ""
                        }`}
                      >
                        <p className="font-semibold text-dark text-sm">{s.userName}</p>
                        <p className="text-xs text-muted">
                          {s.lastMessage ? s.lastMessage.text.slice(0, 40) : "Say hello 👋"}
                        </p>
                      </button>
                    ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-accent text-white font-semibold text-sm">
                Waiting ({waitingSessions.length}) — auto-assigned
              </div>
              <div className="max-h-40 overflow-y-auto">
                {waitingSessions.length === 0 ? (
                  <p className="px-4 py-4 text-center text-sm text-muted">No one waiting</p>
                ) : (
                  waitingSessions.map((s) => (
                    <div key={s.id} className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-dark text-sm">{s.userName}</p>
                      <p className="text-xs text-muted">Waiting for expert</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 bg-primary text-white font-semibold text-sm">Upcoming Requests</div>
              <div className="max-h-64 overflow-y-auto">
                {scheduledSessions.length === 0 ? (
                  <p className="px-4 py-4 text-center text-sm text-muted">No upcoming sessions</p>
                ) : (
                  scheduledSessions.map((s) => (
                    <div key={s.id} className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-dark text-sm">{s.userName}</p>
                        <p className="text-xs text-muted">{formatTime(s.scheduledFor)}</p>
                      </div>
                      <button
                        onClick={() => acceptSession(s)}
                        disabled={!online}
                        className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Accept
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right: chat panel */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-[520px]">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-lighter flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark">Select a session to chat</h3>
                <p className="text-sm text-muted mt-1 max-w-sm">
                  Click an active session on the left to open the conversation.
                </p>
              </div>
            ) : (
              <>
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-dark text-sm">{selected.userName}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> In session
                    </p>
                  </div>
                  <button
                    onClick={endSession}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition"
                  >
                    End Session
                  </button>
                </div>

                <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "expert" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          m.sender === "expert"
                            ? "bg-primary text-white rounded-br-sm"
                            : "bg-white text-dark border border-gray-200 rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-muted pt-8">No messages yet</p>
                  )}
                </div>

                <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition shrink-0"
                    aria-label="Send"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
