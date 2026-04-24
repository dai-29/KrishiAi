// Floating ChatWidget — Bootstrap/green theme (no Tailwind)
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import api from "../utils/api";
import getLocalReply from "../utils/localAI";

const ChatWidget = () => {
  const { lang } = useLang();
  const hi = lang === "hi";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:"assistant", content:"Namaste! 🌾 I'm KrishiBot.\nनमस्ते! मैं KrishiBot हूं।\n\nAsk me about crops, diseases, or government schemes!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setMessages(p => [...p, { role:"user", content:msg }]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.slice(-6).map(m => ({ role:m.role, content:m.content }));
      const res = await api.post("/api/ai/chat", { message:msg, language:hi?"Hindi":"English", history });
      setMessages(p => [...p, { role:"assistant", content:res.data.reply }]);
    } catch {
      const localReply = getLocalReply(msg, lang);
      setMessages(p => [...p, { role:"assistant", content:localReply }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        title="KrishiBot AI"
        style={{
          position:"fixed", bottom:"28px", right:"28px", zIndex:9999,
          width:"56px", height:"56px", borderRadius:"50%",
          background:"#1B5E20", color:"#fff", border:"none",
          fontSize:"1.6rem", cursor:"pointer", boxShadow:"0 4px 18px rgba(27,94,32,0.4)",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"transform 0.2s, box-shadow 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
      >
        {open ? "✕" : "🤖"}
        {!open && (
          <span style={{
            position:"absolute", top:"-4px", right:"-4px",
            width:"14px", height:"14px", borderRadius:"50%",
            background:"#FF6F00", border:"2px solid #fff",
            animation:"pulse 1.5s infinite"
          }}/>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div style={{
          position:"fixed", bottom:"96px", right:"28px", zIndex:9998,
          width:"340px", height:"420px", borderRadius:"16px", overflow:"hidden",
          boxShadow:"0 8px 32px rgba(27,94,32,0.25)", display:"flex", flexDirection:"column",
          border:"1px solid #c8e6c9", background:"#fff",
          animation:"slideUp 0.2s ease"
        }}>
          {/* Header */}
          <div style={{ background:"#1B5E20", padding:"12px 16px", display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ fontSize:"1.4rem" }}>🤖</div>
            <div>
              <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>KrishiBot 🌾</p>
              <p style={{ margin:0, color:"rgba(255,255,255,0.7)", fontSize:"0.75rem" }}>
                {hi?"AI कृषि सहायक":"AI Agriculture Assistant"}
              </p>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft:"auto", background:"none", border:"none", color:"rgba(255,255,255,0.8)", fontSize:"1.2rem", cursor:"pointer", lineHeight:1 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"12px", display:"flex", flexDirection:"column", gap:"10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start", gap:"6px", alignItems:"flex-end" }}>
                {m.role==="assistant" && <span style={{ fontSize:"1.1rem" }}>🤖</span>}
                <div style={{
                  maxWidth:"75%", padding:"8px 12px", borderRadius: m.role==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.role==="user" ? "#1B5E20" : "#f1f8f1",
                  color: m.role==="user" ? "#fff" : "#333",
                  border: m.role==="user" ? "none" : "1px solid #c8e6c9",
                  fontSize:"0.8rem", lineHeight:"1.5", whiteSpace:"pre-wrap"
                }}>
                  {m.content}
                </div>
                {m.role==="user" && <span style={{ fontSize:"1rem" }}>👤</span>}
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex", gap:"6px", alignItems:"flex-end" }}>
                <span style={{ fontSize:"1.1rem" }}>🤖</span>
                <div style={{ background:"#f1f8f1", border:"1px solid #c8e6c9", borderRadius:"16px 16px 16px 4px", padding:"8px 12px", display:"flex", gap:"4px", alignItems:"center" }}>
                  {[0,1,2].map(i=>(
                    <div key={i} style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#1B5E20", animation:"bounce 0.8s infinite", animationDelay:`${i*0.15}s` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <form onSubmit={send} style={{ padding:"10px 12px", borderTop:"1px solid #e8f5e9", display:"flex", gap:"8px" }}>
            <input value={input} onChange={e=>setInput(e.target.value)}
              placeholder={hi?"कुछ भी पूछें...":"Ask me anything..."}
              style={{ flex:1, border:"1.5px solid #a5d6a7", borderRadius:"8px", padding:"7px 10px", fontSize:"0.8rem", outline:"none", background:"#f9fdf9" }}
            />
            <button type="submit" disabled={loading||!input.trim()}
              style={{ background:"#1B5E20", color:"#fff", border:"none", borderRadius:"8px", padding:"0 12px", cursor:"pointer", fontSize:"1rem", opacity:loading||!input.trim()?0.5:1 }}>
              ➤
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
      `}</style>
    </>
  );
};

export default ChatWidget;
