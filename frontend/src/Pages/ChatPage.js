// ChatPage — Bootstrap green theme
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import getLocalReply from "../utils/localAI";

const QUICK_EN = ["How to treat leaf blight?","Best crops for black soil","PM-KISAN scheme details","When to sow wheat?","Organic farming tips"];
const QUICK_HI = ["पत्ती झुलसा रोग का इलाज?","काली मिट्टी के लिए सबसे अच्छी फसल","PM-KISAN योजना की जानकारी","गेहूं कब बोएं?","जैविक खेती के टिप्स"];

const ChatPage = () => {
  const { lang, toggleLanguage } = useLang();
  const { isAuthenticated } = useAuth();
  const hi = lang === "hi";
  const [messages, setMessages] = useState([
    { role:"assistant", content:"🌾 Namaste! I'm KrishiBot, your AI agriculture assistant.\n\nनमस्ते! मैं KrishiBot हूं, आपका AI कृषि सहायक।\n\nAsk me anything about farming, crop diseases, government schemes or market prices!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(p => [...p, { role:"user", content:msg }]);
    setLoading(true);
    try {
      const history = messages.slice(-8).map(m => ({ role:m.role, content:m.content }));
      const res = await api.post("/api/ai/chat", { message:msg, language:hi?"Hindi":"English", history });
      setMessages(p => [...p, { role:"assistant", content:res.data.reply }]);
    } catch {
      // Use local AI fallback when backend is unavailable
      const localReply = getLocalReply(msg, lang);
      setMessages(p => [...p, { role:"assistant", content:localReply }]);
    } finally { setLoading(false); }
  };

  const clearChat = () => setMessages([{ role:"assistant", content: hi
    ? "चैट साफ हो गई! कुछ भी पूछें। 🌾"
    : "Chat cleared! Ask me anything. 🌾" }]);

  return (
    <div style={{ background:"linear-gradient(135deg,#E8F5E9 0%,#fff 60%)", minHeight:"calc(100vh - 120px)", display:"flex", flexDirection:"column" }}>
      <div className="container flex-fill d-flex flex-column py-4" style={{ maxWidth:"760px" }}>

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3 shadow" style={{ width:"52px", height:"52px", background:"#1B5E20", fontSize:"1.6rem" }}>🤖</div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color:"#1B5E20" }}>KrishiBot</h5>
              <small className="text-muted">{hi?"AI कृषि सहायक":"AI Agriculture Assistant"}</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button onClick={toggleLanguage} className="btn btn-sm btn-outline-success rounded-pill px-3">
              🌐 {hi?"English":"हिंदी"}
            </button>
            <button onClick={clearChat} className="btn btn-sm btn-outline-danger rounded-pill px-3" title="Clear chat">🗑️</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-fill overflow-auto mb-3 pe-1" style={{ maxHeight:"55vh" }}>
          {messages.map((m, i) => (
            <div key={i} className={`d-flex mb-3 ${m.role==="user"?"justify-content-end":"justify-content-start"}`}>
              {m.role==="assistant" && (
                <div className="me-2 flex-shrink-0 d-flex align-items-end justify-content-center rounded-circle"
                  style={{ width:"32px", height:"32px", background:"#E8F5E9", border:"1px solid #a5d6a7", fontSize:"1rem" }}>🤖</div>
              )}
              <div className={m.role==="user" ? "chat-bubble-user" : "chat-bubble-bot"} style={{ whiteSpace:"pre-wrap" }}>
                {m.content}
              </div>
              {m.role==="user" && (
                <div className="ms-2 flex-shrink-0 d-flex align-items-end justify-content-center rounded-circle"
                  style={{ width:"32px", height:"32px", background:"#1B5E20", color:"#fff", fontSize:"0.8rem", fontWeight:700 }}>आप</div>
              )}
            </div>
          ))}
          {loading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="me-2 d-flex align-items-end justify-content-center rounded-circle"
                style={{ width:"32px", height:"32px", background:"#E8F5E9", border:"1px solid #a5d6a7", fontSize:"1rem" }}>🤖</div>
              <div className="chat-bubble-bot d-flex align-items-center gap-1">
                <small className="text-muted me-1">{hi?"सोच रहा है":"Thinking"}</small>
                {[0,1,2].map(i=>(
                  <div key={i} className="rounded-circle" style={{ width:"7px", height:"7px", background:"#1B5E20", animation:"bounce 0.8s infinite", animationDelay:`${i*0.15}s` }}/>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {(hi ? QUICK_HI : QUICK_EN).map(p => (
              <button key={p} onClick={() => send(p)}
                className="btn btn-sm rounded-pill" style={{ background:"#E8F5E9", color:"#1B5E20", border:"1px solid #a5d6a7", fontSize:"0.8rem" }}>
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="d-flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
            placeholder={hi?"कुछ भी पूछें...":"Ask me anything about farming..."}
            className="krishi-input flex-fill" />
          <button onClick={()=>send()} disabled={loading||!input.trim()} className="krishi-btn px-4 d-flex align-items-center gap-1">
            <span>{hi?"भेजें":"Send"}</span> ➤
          </button>
        </div>

        {!isAuthenticated && (
          <p className="text-center text-muted small mt-2 mb-0">
            <a href="/login" style={{ color:"#1B5E20" }}>{hi?"लॉगिन करें":"Log in"}</a>
            {hi?" चैट इतिहास सहेजने के लिए":" to save your chat history"}
          </p>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)}
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
