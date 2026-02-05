import React, { useState } from "react";

const LANGUAGES = [
  "Hindi", "English", "Marathi", "Tamil", "Telugu", "Gujarati",
  "Punjabi", "Bengali", "Kannada", "Malayalam", "Odia", "Urdu"
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("Hindi");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Namaste! Main aapki madad kar sakta hoon." }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { role: "user", text: input };
  setMessages((m) => [...m, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text, language })
    });

    const data = await res.json();
    console.log("API response:", data);

    if (data.reply) {
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } else {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.error || "No response" }
      ]);
    }
  } catch (e) {
    setMessages((m) => [...m, { role: "assistant", text: "Server error. Try again." }]);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)}>
        {open ? "×" : "Chat"}
      </button>

      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <div>Krishi AI Chat</div>
            <select
              className="chat-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg assistant">Typing...</div>}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
