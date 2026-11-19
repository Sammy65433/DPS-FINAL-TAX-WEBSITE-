import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaSpinner } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

function formatMessage(text) {
  // Convert **bold** to <strong>, newlines to <br>
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}
export default function DPSChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm the DPS assistant. Ask me about our services, hours, booking, or documents. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Sorry, I couldn't respond. Please call (973) 327-2340 for help.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="dps-chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
      >
        {open ? <FaTimes /> : <FaRobot />}
      </button>

      {open && (
        <div className="dps-chat-panel">
          <div className="dps-chat-header">
            <FaRobot className="me-2" />
            <strong>DPS Assistant</strong>
            <button
              type="button"
              className="dps-chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          <div className="dps-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`dps-chat-msg dps-chat-msg--${msg.role}`}>
                {formatMessage(msg.text)}
              </div>
            ))}
            {loading && (
              <div className="dps-chat-msg dps-chat-msg--assistant">
                <FaSpinner className="spin" /> Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="dps-chat-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask about services, hours, booking..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}