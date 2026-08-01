"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "prakriti_session_id";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("home");
  const [userName, setUserName] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [expert, setExpert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [queuePosition, setQueuePosition] = useState(0);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduledFor, setScheduledFor] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef(null);
  const lastTsRef = useRef("");

  const isPortal = pathname?.startsWith("/portal");

  const loadMessages = useCallback(async (sid, after) => {
    const url = `/api/chat/messages?sessionId=${sid}${after ? `&after=${encodeURIComponent(after)}` : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.messages || [];
  }, []);

  useEffect(() => {
    if (isPortal) return;
    function onOpenChat() {
      setOpen(true);
    }
    window.addEventListener("prakriti:open-chat", onOpenChat);
    return () => window.removeEventListener("prakriti:open-chat", onOpenChat);
  }, [isPortal]);

  useEffect(() => {
    if (!open || !sessionId) return;
    let cancelled = false;

    async function poll() {
      if (cancelled) return;
      try {
        if (view === "chat") {
          const url = `/api/chat/messages?sessionId=${sessionId}${
            lastTsRef.current ? `&after=${encodeURIComponent(lastTsRef.current)}` : ""
          }`;
          const res = await fetch(url);
          const data = await res.json();
          if (cancelled) return;
          if (data.session?.status === "ended") {
            setView("ended");
            localStorage.removeItem(STORAGE_KEY);
            setSessionId(null);
            setMessages([]);
            setExpert(null);
            return;
          }
          const msgs = data.messages || [];
          if (msgs.length) {
            setMessages((prev) => {
              const existing = new Set(prev.map((m) => m.id));
              const fresh = msgs.filter((m) => !existing.has(m.id));
              return [...prev, ...fresh];
            });
            lastTsRef.current = msgs[msgs.length - 1].timestamp;
          }
        } else {
          const res = await fetch(`/api/chat/session?sessionId=${sessionId}`);
          const data = await res.json();
          if (cancelled) return;
          if (!res.ok) {
            setView("home");
            localStorage.removeItem(STORAGE_KEY);
            setSessionId(null);
            return;
          }
          const status = data.session?.status;
          setQueuePosition(data.queuePosition || 0);

          if (status === "active") {
            setExpert(data.session.expert);
            const r2 = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
            const d2 = await r2.json();
            const msgs = d2.messages || [];
            if (cancelled) return;
            setMessages(msgs);
            lastTsRef.current = msgs.length ? msgs[msgs.length - 1].timestamp : "";
            setView("chat");
          } else if (status === "scheduled") {
            setScheduledFor(data.session.scheduledFor);
            setView("scheduled");
          } else if (status === "ended") {
            setView("ended");
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        // network error, ignore and retry
      }
    }

    poll();
    const id = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [open, sessionId, view, loadMessages]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, view]);

  async function startInstant() {
    setLoading(true);
    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "instant", userName }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      localStorage.setItem(STORAGE_KEY, data.sessionId);
      if (data.status === "active") {
        setExpert(data.expert);
        const msgs = await loadMessages(data.sessionId, "");
        setMessages(msgs);
        lastTsRef.current = msgs.length ? msgs[msgs.length - 1].timestamp : "";
        setView("chat");
      } else {
        setQueuePosition(data.queuePosition || 0);
        setView("connecting");
      }
    } catch (e) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  async function confirmSchedule() {
    if (!scheduleDate || !scheduleTime) {
      alert("Please pick a date and time.");
      return;
    }
    const forDate = new Date(`${scheduleDate}T${scheduleTime}:00`);
    setLoading(true);
    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "scheduled", userName, scheduledFor: forDate.toISOString() }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setScheduledFor(data.scheduledFor);
      localStorage.setItem(STORAGE_KEY, data.sessionId);
      setView("scheduled");
    } catch (e) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || !sessionId) return;
    setInput("");
    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text }),
      });
      if (!res.ok) {
        if (res.status === 400) {
          setView("ended");
          localStorage.removeItem(STORAGE_KEY);
          setSessionId(null);
          setMessages([]);
          setExpert(null);
        }
        return;
      }
      const msgs = await loadMessages(sessionId, "");
      setMessages(msgs);
      lastTsRef.current = msgs.length ? msgs[msgs.length - 1].timestamp : "";
    } catch (e) {
      alert("Could not send message.");
    }
  }

  async function endSession() {
    if (!sessionId) return;
    try {
      await fetch("/api/chat/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setMessages([]);
    setExpert(null);
    setView("ended");
  }

  function closeWidget() {
    setOpen(false);
  }

  function resetWidget() {
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setMessages([]);
    setExpert(null);
    setUserName("");
    setScheduledFor(null);
    setView("home");
  }

  if (isPortal) return null;

  const scheduledLabel = scheduledFor
    ? new Date(scheduledFor).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <>
      {open && (
        <div className="fixed inset-x-0 bottom-0 z-[60] flex flex-col bg-white shadow-2xl border-t border-gray-200 md:inset-x-auto md:bottom-6 md:right-6 md:w-[380px] md:h-[600px] md:max-h-[calc(100vh-6rem)] md:rounded-2xl md:border md:shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">Prakriti Mind</p>
                <p className="text-xs text-white/80">
                  {view === "chat" && expert
                    ? `Chatting with ${expert.name}`
                    : "We're here to help"}
                </p>
              </div>
            </div>
            <button onClick={closeWidget} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors" aria-label="Close chat">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {view === "home" && (
              <div className="p-5 overflow-y-auto">
                <h3 className="text-lg font-bold text-dark">Hi there 👋</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  You&rsquo;re not alone. Our trained experts are here to support you.
                  How would you like to connect?
                </p>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-muted mb-1.5">Your name (optional)</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm"
                  />
                </div>

                <button
                  onClick={startInstant}
                  disabled={loading}
                  className="mt-4 w-full py-3 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Connecting..." : "💬 Talk to an Expert Now"}
                </button>
                <button
                  onClick={() => setView("schedule")}
                  className="mt-3 w-full py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition"
                >
                  📅 Schedule for Later
                </button>
                <p className="mt-4 text-center text-xs text-muted">
                  Free • Confidential • 30 minutes
                </p>
              </div>
            )}

            {view === "schedule" && (
              <div className="p-5 overflow-y-auto">
                <h3 className="text-lg font-bold text-dark">Schedule a Session</h3>
                <p className="text-sm text-muted mt-1">Pick a date and time that works for you.</p>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-muted mb-1.5">Your name (optional)</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-muted mb-1.5">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-muted mb-1.5">Time</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition text-sm"
                  >
                    <option value="">Select a time</option>
                    {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((t) => (
                      <option key={t} value={t}>
                        {new Date(`2000-01-01T${t}:00`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={confirmSchedule}
                  disabled={loading}
                  className="mt-5 w-full py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition disabled:opacity-50"
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
                <button
                  onClick={() => setView("home")}
                  className="mt-2 w-full py-2 rounded-full text-sm text-muted hover:text-dark transition"
                >
                  Back
                </button>
              </div>
            )}

            {view === "connecting" && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full border-4 border-primary-lighter border-t-primary animate-spin mb-4" />
                <h3 className="font-bold text-dark">Finding an expert...</h3>
                <p className="text-sm text-muted mt-2">
                  We&rsquo;re connecting you with an available expert. This usually takes a moment.
                </p>
                {queuePosition > 0 && (
                  <p className="text-xs text-accent font-semibold mt-3">
                    You&rsquo;re #{queuePosition} in queue
                  </p>
                )}
                <button
                  onClick={endSession}
                  className="mt-6 text-sm text-muted hover:text-red-500 transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {view === "scheduled" && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary-lighter flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark">Session Booked! 🎉</h3>
                <p className="text-sm text-muted mt-2">
                  Your free 30-minute session is scheduled for:
                </p>
                <p className="text-sm font-bold text-primary mt-1">{scheduledLabel}</p>
                <p className="text-xs text-muted mt-4">
                  Keep this chat open at your scheduled time and an expert will connect with you here.
                </p>
                <button
                  onClick={closeWidget}
                  className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition"
                >
                  Done
                </button>
              </div>
            )}

            {view === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                  {expert && (
                    <div className="flex items-center gap-2 justify-center text-xs text-muted">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {expert.name} — {expert.specialty}
                    </div>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          m.sender === "user"
                            ? "bg-primary text-white rounded-br-sm"
                            : "bg-white text-dark border border-gray-200 rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-muted pt-8">
                      You&rsquo;re connected with {expert?.name}. Say hello to get started 💚
                    </p>
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

                <div className="px-4 pb-3 bg-white">
                  <button
                    onClick={endSession}
                    className="w-full py-2 rounded-full text-xs text-muted hover:text-red-500 transition"
                  >
                    End Session
                  </button>
                </div>
              </div>
            )}

            {view === "ended" && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="font-bold text-dark">Session Ended</h3>
                <p className="text-sm text-muted mt-2">
                  Thank you for reaching out. Take care of yourself 💚
                </p>
                <button
                  onClick={resetWidget}
                  className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition"
                >
                  Start New Chat
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30 hover:bg-green-700 hover:scale-105 transition-all flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
