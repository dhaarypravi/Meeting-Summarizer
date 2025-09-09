"use client";
import { useState } from "react";
import { BackgroundBeamsDemo } from "../components/Background/page";

function parseRecipients(input: string): string[] {
  return input
    .split(",")
    .map((r) => r.trim())
    .filter((r) => r.length > 0);
}

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("Summarize in bullet points for executives");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");
  const [emailSending, setEmailSending] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    setTranscript(text);
  };

  const generate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate summary");
      setSummary(data.summary || "");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setEmailSending(true);
      const recips = parseRecipients(recipients);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients: recips, subject, body: summary }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      alert("Email sent!");
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Failed to send email");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <BackgroundBeamsDemo>
      <main className="max-w-3xl mx-auto p-6 text-white">
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{
            background: "linear-gradient(to right, #0ea5e9, #ef4444)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          AI Meeting Notes Summarizer & Sharer
        </h1>

        {/* 1) Transcript */}
        <section className="mb-6 p-4 border border-gray-700 rounded-lg bg-black/50">
          <h2 className="text-lg mb-2">1) Transcript</h2>
          <input
            type="file"
            accept=".txt,.md"
            onChange={(e) => handleFile(e.target.files?.[0] || undefined)}
            className="mb-2 cursor-pointer text-sm"
          />
          <textarea
            placeholder="Or paste transcript here…"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={10}
            className="w-full p-3 rounded-md border border-gray-600 bg-black/30 text-white"
          />
        </section>

        {/* 2) Custom Instruction */}
        <section className="mb-6 p-4 border border-gray-700 rounded-lg bg-black/50">
          <h2 className="text-lg mb-2">2) Custom Instruction</h2>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g., "Highlight only action items"'
            className="w-full p-3 rounded-md border border-gray-600 mb-3 bg-black/30 text-white"
          />
          <button
            onClick={generate}
            disabled={isLoading || !transcript.trim()}
            className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-sky-500 to-red-500 hover:opacity-90 transition"
          >
            {isLoading ? "Generating…" : "Generate Summary"}
          </button>
        </section>

        {/* 3) Editable Summary */}
        <section className="mb-6 p-4 border border-gray-700 rounded-lg bg-black/50">
          <h2 className="text-lg mb-2">3) Editable Summary</h2>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={14}
            placeholder="Summary will appear here…"
            className="w-full p-3 rounded-md border border-gray-600 bg-black/30 text-white"
          />
        </section>

        {/* 4) Share via Email */}
        <section className="mb-6 p-4 border border-gray-700 rounded-lg bg-black/50">
          <h2 className="text-lg mb-2">4) Share via Email</h2>
          <input
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="Recipients (comma-separated)"
            className="w-full p-3 rounded-md border border-gray-600 mb-2 bg-black/30 text-white"
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full p-3 rounded-md border border-gray-600 mb-3 bg-black/30 text-white"
          />
          <button
            onClick={sendEmail}
            disabled={emailSending || !summary.trim() || !recipients.trim()}
            className="px-4 py-2 rounded-md font-semibold text-white bg-gradient-to-r from-sky-500 to-red-500 hover:opacity-90 transition"
          >
            {emailSending ? "Sending…" : "Send Email"}
          </button>
        </section>
      </main>
    </BackgroundBeamsDemo>
  );
}
