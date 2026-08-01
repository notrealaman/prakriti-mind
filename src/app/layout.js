import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Prakriti Mind — Your Mental Health Matters",
  description:
    "Free 30-minute psychological assistance sessions. Mental health awareness, blogs, and a supportive community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
