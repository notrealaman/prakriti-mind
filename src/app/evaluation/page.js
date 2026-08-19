"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenChatButton from "@/components/OpenChatButton";

const questions = [
  { id: "mood", label: "How would you rate your overall mood lately?", emojis: ["😢", "😟", "😐", "🙂", "😊"] },
  { id: "anxiety", label: "How often do you feel anxious or worried?", emojis: ["Always", "Often", "Sometimes", "Rarely", "Never"] },
  { id: "sleep", label: "How has your sleep been?", emojis: ["😫", "😩", "😐", "😌", "😴"] },
  { id: "stress", label: "How would you rate your stress level?", emojis: ["💥", "😰", "😕", "🙂", "🧘"] },
  { id: "energy", label: "How is your energy level throughout the day?", emojis: ["😵", "😴", "😐", "💪", "⚡"] },
];

export default function EvaluationPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [responses, setResponses] = useState({});
  const [story, setStory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(id, value) {
    setResponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleNext() {
    if (step < questions.length) setStep((s) => s + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-dark mb-3">Thank You</h1>
            <p className="text-muted mb-8">
              Your responses have been recorded. If you&rsquo;d like to talk to someone right now, we&rsquo;re here for you.
            </p>
            <OpenChatButton className="inline-flex items-center px-8 py-3.5 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-all">
              Talk to Someone Now
            </OpenChatButton>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const current = questions[step];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-dark">
              Free Psychological <span className="text-primary">Evaluation</span>
            </h1>
            <p className="mt-3 text-muted">
              A few quick questions to help us understand how you&rsquo;re doing.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                {step === 0 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-dark">About You</h2>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min="1"
                        max="120"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                        placeholder="Your age"
                      />
                    </div>
                  </div>
                )}

                {step > 0 && step <= questions.length && (
                  <div>
                    <div className="flex justify-between text-sm text-muted mb-6">
                      <span>Question {step} of {questions.length}</span>
                      <span>{Math.round((step / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-8">
                      <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${(step / questions.length) * 100}%` }} />
                    </div>

                    <h2 className="text-lg font-bold text-dark mb-6 text-center">{current.label}</h2>
                    <div className="flex justify-center gap-3 sm:gap-4">
                      {current.emojis.map((emoji, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelect(current.id, i + 1)}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl border-2 transition-all ${
                            responses[current.id] === i + 1
                              ? "border-primary bg-primary-lighter scale-110 shadow-md"
                              : "border-gray-200 hover:border-primary/40 bg-gray-50"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-xs text-muted mt-3">
                      {["Very Low", "Low", "Moderate", "Good", "Excellent"][i] || ""}
                    </p>
                  </div>
                )}

                {step > questions.length && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-dark">What&rsquo;s on your mind?</h2>
                    <p className="text-sm text-muted">Share anything you&rsquo;d like us to know (optional).</p>
                    <textarea
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
                      placeholder="I've been feeling..."
                    />
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="px-6 py-2.5 rounded-xl border border-gray-200 text-muted font-medium hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step <= questions.length ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={step === 0 ? false : !responses[current?.id]}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {step === 0 ? "Start Assessment" : "Next"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
