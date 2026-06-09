import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUICK_REPLIES, SYSTEM_PROMPT } from './knowledgeBase.js';

/* ─── CONFIGURATION ───────────────────────────────────────────
   Google Gemini API — FREE TIER
   • 15 requests/minute
   • 1 million tokens/day
   • No credit card required
   Get your free key: https://aistudio.google.com/app/apikey
   Replace the placeholder below with your actual API key.
──────────────────────────────────────────────────────────────── */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const WA             = '917202052004';
const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
/* ─── Colours ─── */
const C = {
  bg:      '#FFFFFF',
  bg2:     '#FFF8FA',
  bg3:     '#FFF0F4',
  blush:   '#F7E8EC',
  petal:   '#FDEEF2',
  burg:    '#5C1322',
  burgLt:  '#8B2535',
  rose:    '#C4758A',
  roseSft: '#E8A0B0',
  text:    '#1A0408',
  textMid: '#5C2030',
  textMut: '#9B5868',
  border:  'rgba(92,19,34,0.12)',
};

const INITIAL_MSG = {
  id: 'welcome',
  role: 'bot',
  text: "Hi there! 👋 I'm the Soulful Scribble assistant.\nI can help you with our **Gifting Hub** 🎁 and **Techno Hub** ⚡ — products, pricing, delivery, services, and more!\n\nWhat can I help you with today?",
  time: new Date(),
};

/* ─── Main export ─── */
export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([INITIAL_MSG]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [unread, setUnread]   = useState(0);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  /* scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  /* focus input when chat opens */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(0);
    }
  }, [open]);

  /* call Gemini API */
const callGemini = useCallback(async (userMessage, history) => {
  // if (GEMINI_API_KEY =="AIzaSyBNF1ffhMJQIU4JQ8XqVYNZatO98tXtRQ4") {
  //   return "⚙️ API Key missing.";
  // }

  // 1. Build the conversation contents
  const contents = [];

  // 2. Inject the System Prompt as a 'user' message followed by a 'model' acknowledgment
  // This is a reliable workaround when top-level system_instruction fails
  contents.push({
    role: 'user',
    parts: [{ text: `INSTRUCTIONS: ${SYSTEM_PROMPT}\n\nPlease acknowledge these instructions and wait for the user.` }]
  });
  contents.push({
    role: 'model',
    parts: [{ text: "Understood. I will act as the Soulful Scribble assistant based on those instructions." }]
  });

  // 3. Add the rest of the actual user-bot history
  history.slice(1).forEach(m => {
    if (m.text && m.text.trim() !== '') {
      contents.push({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }],
      });
    }
  });

  // 4. Add the current user question
  contents.push({ 
    role: 'user', 
    parts: [{ text: userMessage }] 
  });

  const body = {
    contents: contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 512,
    },
  };

  try {
    const res = await fetch(GEMINI_URL, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(body) 
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data?.error?.message || 'API Error');
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
  } catch (err) {
    console.error("Chatbot Error:", err);
    throw err;
  }
}, []);
  /* send message */
  const sendMessage = useCallback(async (text) => {
    const question = text.trim();
    if (!question || typing) return;

    setShowQuick(false);
    const userMsg = { id: Date.now(), role: 'user', text: question, time: new Date() };
    setMsgs(prev => {
      const updated = [...prev, userMsg];
      triggerBotReply(question, updated);
      return updated;
    });
    setInput('');
  }, [typing]);

  const triggerBotReply = async (question, history) => {
    setTyping(true);
    try {
      const answer = await callGemini(question, history);
const botMsg = { id: `bot-${Date.now()}-${Math.random()}`, role: 'bot', text: answer, time: new Date() };
      setMsgs(prev => [...prev, botMsg]);
      if (!open) setUnread(n => n + 1);
    } catch (err) {
      const errMsg = { id: Date.now() + 1, role: 'bot', text: "Sorry, I had trouble connecting 😕 Please try again or WhatsApp us directly!", time: new Date() };
      setMsgs(prev => [...prev, errMsg]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } };
  const handleQuick = (msg) => sendMessage(msg);
  const clearChat = () => { setMsgs([INITIAL_MSG]); setShowQuick(true); };

  return (
    <>
      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9000,
          width: '58px', height: '58px', borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: `linear-gradient(135deg, ${C.burg}, ${C.rose})`,
          boxShadow: `0 6px 24px rgba(92,19,34,0.35)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '24px',
        }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          <motion.span key={open ? 'close' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            {open ? '✕' : '🤖'}
          </motion.span>
        </AnimatePresence>
        {/* Unread badge */}
        {!open && unread > 0 && (
          <div style={{ position: 'absolute', top: '0', right: '0', width: '18px', height: '18px', borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            {unread}
          </div>
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', bottom: '96px', right: '24px', zIndex: 8999,
              width: 'clamp(320px, 92vw, 400px)',
              height: 'clamp(480px, 78vh, 600px)',
              background: C.bg, borderRadius: '24px',
              border: `1.5px solid ${C.border}`,
              boxShadow: '0 24px 64px rgba(92,19,34,0.18), 0 2px 8px rgba(92,19,34,0.08)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${C.burg}, ${C.burgLt} 60%, ${C.rose})`, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                <img src="/logo.png" alt="SS" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                <span style={{ display: 'none' }}>🌸</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Soulful Scribble</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>Online — typically replies fast</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* WhatsApp shortcut */}
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                  style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', transition: 'background 0.2s' }}
                  title="Chat on WhatsApp"
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'}>
                   <WAIcon />
                </a>
                {/* Clear */}
                <button onClick={clearChat} title="Clear chat"
                  style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'}>
                  🗑
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '10px', background: C.bg2 }}>

              {msgs.map(msg => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <BotAvatar />
                  <div style={{ padding: '12px 16px', borderRadius: '18px 18px 18px 4px', background: C.bg, border: `1px solid ${C.border}`, display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0.1, 0.25, 0.4].map((delay, i) => (
                      <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay }}
                        style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.rose }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick reply chips — shown only at start */}
              {showQuick && !typing && msgs.length === 1 && (
                <div style={{ marginTop: '4px' }}>
                  <p style={{ fontSize: '11px', color: C.textMut, marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Quick questions:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {QUICK_REPLIES.map(q => (
                      <button key={q.label} onClick={() => handleQuick(q.message)}
                        style={{ padding: '7px 13px', borderRadius: '40px', fontSize: '12px', background: C.blush, border: `1.5px solid ${C.border}`, color: C.textMid, cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 500, transition: 'all 0.18s' }}
                        onMouseEnter={e => { e.currentTarget.style.background=C.petal; e.currentTarget.style.borderColor=`rgba(92,19,34,0.25)`; e.currentTarget.style.color=C.burg; }}
                        onMouseLeave={e => { e.currentTarget.style.background=C.blush; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.textMid; }}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div style={{ padding: '12px 14px', background: C.bg, borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask me anything about Soulful Scribble…"
                  rows={1}
                  style={{
                    flex: 1, padding: '11px 14px', borderRadius: '14px', border: `1.5px solid ${C.border}`,
                    background: C.bg2, color: C.text, fontSize: '14px', outline: 'none', fontFamily: 'DM Sans',
                    resize: 'none', maxHeight: '100px', lineHeight: 1.5, transition: 'border-color 0.2s',
                    overflowY: 'auto',
                  }}
                  onFocus={e => e.target.style.borderColor=C.rose}
                  onBlur={e => e.target.style.borderColor=C.border}
                />
                <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
                  style={{
                    width: '42px', height: '42px', borderRadius: '12px', border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                    background: input.trim() && !typing ? `linear-gradient(135deg,${C.burg},${C.rose})` : C.blush,
                    color: input.trim() && !typing ? '#fff' : C.roseSft,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                    flexShrink: 0, transition: 'all 0.2s', boxShadow: input.trim() && !typing ? `0 4px 12px rgba(92,19,34,0.25)` : 'none',
                  }}>
                  ➤
                </button>
              </div>
              <p style={{ fontSize: '10px', color: C.textMut, marginTop: '7px', textAlign: 'center' }}>
                Powered by Gemini AI · <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ color: C.rose, fontWeight: 600 }}>WhatsApp for orders</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Message bubble ── */
function MessageBubble({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
      style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flexDirection: isBot ? 'row' : 'row-reverse' }}>

      {isBot && <BotAvatar />}

      <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: isBot ? 'flex-start' : 'flex-end' }}>
        <div style={{
          padding: '11px 15px', borderRadius: isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
          background: isBot ? '#FFFFFF' : `linear-gradient(135deg,${C.burg},${C.burgLt})`,
          color: isBot ? C.text : '#fff',
          fontSize: '14px', lineHeight: 1.65, fontFamily: 'DM Sans',
          border: isBot ? `1px solid ${C.border}` : 'none',
          boxShadow: isBot ? '0 2px 8px rgba(92,19,34,0.06)' : `0 4px 12px rgba(92,19,34,0.22)`,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          <FormattedText text={msg.text} isBot={isBot} />
        </div>
        <span style={{ fontSize: '10px', color: C.textMut, marginTop: '3px', padding: '0 4px' }}>
          {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Bot avatar ── */
function BotAvatar() {
  return (
    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg,${C.burg},${C.rose})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, boxShadow: `0 2px 8px rgba(92,19,34,0.2)` }}>
      🌸
    </div>
  );
}

/* ── Render **bold** markdown ── */
function FormattedText({ text, isBot }) {
  const color = isBot ? C.burg : 'rgba(255,255,255,0.9)';
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ fontWeight: 700, color }}>{part.slice(2,-2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}