"use client";
import { useState } from "react";

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
    <main style={{ maxWidth: 960, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16  , background: "linear-gradient(to right, #0ea5e9, #ef4444)", // primary → danger
        WebkitBackgroundClip: "text", // Required for Safari/Chrome
        backgroundClip: "text",       // Standard property
        color: "transparent",
                 // Makes gradient visible inside text
       }}>
        AI Meeting Notes Summarizer & Sharer
      </h1>

      {/* 1) Transcript */}
      <section style={{ marginBottom: 24, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>1) Transcript</h2>
        <input
          type="file"
          accept=".txt,.md"
          onChange={(e) => handleFile(e.target.files?.[0] || undefined)}
          style={{ marginBottom: 8  , background: "linear-gradient(to right, #0ea5e9, #ef4444)", // primary → danger
        WebkitBackgroundClip: "text", // Required for Safari/Chrome
        backgroundClip: "text",       // Standard property
        color: "transparent", cursor: "pointer" }}
        />
        <textarea
          placeholder="Or paste transcript here…"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={10}
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444" }}
        />
      </section>

      {/* 2) Custom Instruction */}
      <section style={{ marginBottom: 24, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>2) Custom Instruction</h2>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g., "Highlight only action items"'
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444" }}
        />
        <button
          onClick={generate}
          disabled={isLoading || !transcript.trim()}
         style={{
  marginTop: 12,
  padding: "10px 16px",
  borderRadius: 10,
  border: "1px solid #444",
  cursor: "pointer",
  display: "block",
  textAlign: "center",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "1em",
  textTransform: "uppercase",
  color: "#fff",
  margin: "10px",
  backgroundSize: "300% 300%",
  background: "linear-gradient(to right, #0ea5e9, #ef4444)",
  transition: "background-position 0.5s ease", // Smooth animation

}}


        >
          {isLoading ? "Generating…" : "Generate Summary"}
        </button>
      </section>

      {/* 3) Editable Summary */}
      <section style={{ marginBottom: 24, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>3) Editable Summary</h2>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={14}
          placeholder="Summary will appear here…"
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444" }}
        />
      </section>

      {/* 4) Share via Email */}
      <section style={{ marginBottom: 24, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>4) Share via Email</h2>
        <input
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="Recipients (comma-separated)"
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", marginBottom: 8 }}
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #444", marginBottom: 8 }}
        />
        <button
          onClick={sendEmail}
          disabled={emailSending || !summary.trim() || !recipients.trim()}
          style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #444", cursor: "pointer", background: "linear-gradient(to right, #0ea5e9, #ef4444)", color: "#fff", fontWeight: 600, fontSize: "1em", textTransform: "uppercase", backgroundSize: "300% 300%", transition: "background-position 0.5s ease", margin: "10px" }}
        >
          {emailSending ? "Sending…" : "Send Email"}
        </button>
      </section>
    </main>
  );
}