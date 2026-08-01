"use client";

export default function OpenChatButton({ children, className }) {
  function openChat() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("prakriti:open-chat"));
    }
  }

  return (
    <button type="button" onClick={openChat} className={className}>
      {children}
    </button>
  );
}
