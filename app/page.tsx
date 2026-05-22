"use client";
import { useState, useEffect, useRef } from "react";
import {
  Moon, Sun, MapPin, ExternalLink, ChevronRight,
  Mail, GitFork, Link2, Share2, MessageSquare,
  Send, X, ArrowRight, BookOpen, Shield, Code2,
  Cpu, Globe, Star, GraduationCap, Briefcase
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  { role: "BSIS Student", org: "Caraga State University", year: "2024–Now", type: "academic" },
  { role: "GDSC Tech Ambassador", org: "USTP CDO — Data Science", year: "2023", type: "org" },
  { role: "CS Student", org: "USTP Main Campus, CDO", year: "2022–2023", type: "academic" },
  { role: "CS Student", org: "Caraga State University", year: "2021–2022", type: "academic" },
  { role: "First Line of Code — HTML", org: "CSU Senior High School", year: "2020", type: "milestone" },
];

const SKILLS: Record<string, { items: string[]; upcoming?: string[] }> = {
  Frontend: { items: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Bootstrap"], upcoming: ["Vue.js", "React"] },
  Backend: { items: ["Python", "C Language", "SQL", "PostgreSQL"], upcoming: ["Node.js", "Laravel", "PHP", "C++"] },
  "Data Science": { items: ["Python (DS)", "Jupyter Notebook"] },
  "Tools": { items: ["Git", "VS Code", "Laragon"] },
};

const PROJECTS = [
  { name: "Bugsay Car Rental System", desc: "Full-featured car rental system with booking, admin panel & inventory.", tags: ["Laravel", "Vue.js", "MySQL"], url: null, highlight: true },
  { name: "Tranzio", desc: "Smart commute companion app for Butuan City using Leaflet.js maps.", tags: ["HTML", "JS", "Leaflet.js"], url: null },
  { name: "DepEd Butuan City Website", desc: "HCI group redesign — React/TypeScript, Tailwind CSS, custom routing.", tags: ["React", "TypeScript", "Tailwind"], url: null },
  { name: "Student Management System", desc: "CRUD system with Laravel API + VueJS SPA.", tags: ["Laravel", "Vue.js"], url: null },
  { name: "Inventory System", desc: "Raw HTML/JS/SQLite inventory manager for Software Engineering.", tags: ["HTML", "JS", "SQLite3"], url: null },
  { name: "Otaku Blog", desc: "Personal anime & manga blog at marshmallow707.github.io/YxnZxTW", tags: ["GitHub Pages"], url: "https://marshmallow707.github.io/YxnZxTW" },
];

const CERTS = [
  { name: "Introduction to HTML", issuer: "SoloLearn", year: "2026" },
  { name: "Introduction to CSS", issuer: "SoloLearn", year: "2026" },
  { name: "Introduction to Java", issuer: "SoloLearn", year: "2025" },
];

const GOALS = [
  { icon: Shield, text: "Specialize in Cybersecurity & Web Security" },
  { icon: Code2, text: "Build a Dark Pattern Detector browser extension" },
  { icon: Globe, text: "Launch a full-stack IS project serving the community" },
  { icon: Star, text: "Earn industry certifications (CompTIA Security+, Google)" },
  { icon: BookOpen, text: "Contribute to open source & share knowledge" },
];

const GALLERY_CERTS = [
  { file: "/gallery/cert-html.jpg", label: "HTML — SoloLearn" },
  { file: "/gallery/cert-css.jpg", label: "CSS — SoloLearn" },
  { file: "/gallery/cert-java.jpg", label: "Java — SoloLearn" },
];

const GALLERY_PROJECTS = [
  { file: "/gallery/proj-bugsay.png", label: "Bugsay Car Rental" },
  { file: "/gallery/proj-tranzio.png", label: "Tranzio App" },
  { file: "/gallery/proj-deped.png", label: "DepEd Website" },
  { file: "/gallery/proj-sms.png", label: "Student Mgmt System" },
  { file: "/gallery/proj-inventory.png", label: "Inventory System" },
  { file: "/gallery/proj-ascii.png", label: "ASCII Art — Python" },
  { file: "/gallery/proj-otakublog.png", label: "Otaku Blog (Tailwind Webpage)" },
  { file: "/gallery/proj-boostrapweb.png", label: "Bootstrap Webpage" },
  { file: "/gallery/proj-minigame.png", label: "Mini (Web) Game Development" },
  { file: "/gallery/proj-pythonquiz.png", label: "Portable Python (Otaku) Quiz App" },
];

const MEMBERSHIPS = [
  { name: "Google Developer Student Clubs (GDSC)", role: "Former Tech Ambassador — Data Science", url: null },
  { name: "Otaku Blog Community", role: "Author & Curator", url: "https://marshmallow707.github.io/YxnZxTW" },
];

// ─── CHAT WIDGET ──────────────────────────────────────────────────────────

interface ChatMsg { role: "user" | "ai"; text: string }

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Delay unmount so close animation can play
  useEffect(() => {
    if (open) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "ai", text: "Hi! I'm an AI trained on Adrianne's profile. Ask me anything about her skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an AI assistant on Mary Adrianne D. Bisoy's portfolio website. Answer questions about her concisely and professionally.

About her:
- Full name: Mary Adrianne D. Bisoy, known online as YxnZx or madb
- Student: BS Information Science (BSIS), 3rd year, Caraga State University Main Campus, Butuan City
- Location: Agusan del Norte, Philippines
- Previous: USTP CDO (CS + Data Science), former GDSC Tech Ambassador in Data Science
- Email: madbcsu@gmail.com
- GitHub: github.com/Marshmallow707
- LinkedIn: linkedin.com/in/dri-bisoy-a5648b352
- Reddit: reddit.com/user/Boring_Ad7860

Skills: HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, Python, C, SQL, PostgreSQL, Git, VS Code. Learning: Vue.js, React, Laravel, Node.js, PHP, C++.

Key projects: Bugsay Car Rental System (Laravel+Vue — highlight project), Tranzio (smart commute app for Butuan, Leaflet.js), DepEd Butuan website redesign (React+TypeScript), Student Management System (Laravel API + Vue SPA), Inventory System (HTML/JS/SQLite).

Certifications: Intro to HTML (SoloLearn 2026), Intro to CSS (SoloLearn 2026), Intro to Java (SoloLearn 2025).

Interests: Cybersecurity, Web Security, AI Ethics, Web Design. Future goal: Dark Pattern Detector browser extension. Dream: White Hat Hacker since junior high after falling victim to online scams.

Keep answers short (2-4 sentences), warm, and professional. If asked something not about Adrianne, redirect politely.`,
          messages: [
            ...msgs.filter(m => m.role !== "ai" || msgs.indexOf(m) > 0).map(m => ({
              role: m.role === "ai" ? "assistant" : "user",
              content: m.text
            })),
            { role: "user", content: q }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? "Sorry, I couldn't fetch a response right now.";
      setMsgs(prev => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: "ai", text: "Oops, something went wrong. Try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bubble">
      {visible && (
        <div className="chat-window" style={{ height: 420, animation: open ? "chatFloatIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" : "chatFloatOut 0.24s ease forwards" }}>
          {/* Header */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-card)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg-secondary)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src="/BisoyPic01.jpg" alt="madb" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).src = "https://ui-avatars.com/api/?name=M&background=2d6a4f&color=fff&size=64"; }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--text)" }}>Chat with Adrianne</p>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div className="pulse" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>AI-powered</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10, background: "var(--bg)" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === "ai" ? "ai" : "user"}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="chat-msg ai" style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)", animation: `bounce 1s ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, background: "var(--bg-card)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about skills, projects..."
              maxLength={500}
              style={{ flex: 1, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 12px", fontSize: 13, color: "var(--text)", fontFamily: "var(--font-sans)", outline: "none" }}
            />
            <button onClick={send} disabled={loading || !input.trim()}
              style={{ background: "var(--text)", color: "var(--bg)", border: "none", borderRadius: 6, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: loading || !input.trim() ? 0.4 : 1, flexShrink: 0 }}>
              <Send size={13} />
            </button>
          </div>
          <p style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-subtle)", padding: "6px 0 8px", background: "var(--bg-card)" }}>
            Ask me about Adrianne
          </p>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen(o => !o)}>
        <MessageSquare size={14} />
        Chat with Adrianne
      </button>
      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes chatFloatIn {
          from { opacity: 0; transform: translateY(20px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes chatFloatOut {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.95); }
        }
        @keyframes togglePop {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .chat-toggle:active { animation: togglePop 0.18s ease; }
      `}</style>
    </div>
  );
}

// ─── GALLERY STRIP ────────────────────────────────────────────────────────

function GalleryStrip({ items, title }: { items: { file: string; label: string }[]; title: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div style={{ marginBottom: 32 }}>
      <p className="sec-title" style={{ marginBottom: 12 }}>{title}</p>
      <div className="gallery-scroll">
        {items.map((g, i) => (
          <div key={i} className="gallery-item" onClick={() => setLightbox(g.file)}>
            <img src={g.file} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement;
                if (p && !p.querySelector(".ph")) {
                  const d = document.createElement("div");
                  d.className = "ph";
                  d.style.cssText = "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;text-align:center;";
                  d.innerHTML = `<div style="font-family:var(--font-mono);font-size:9px;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-subtle);line-height:1.6;">${g.label}<br/><span style="color:var(--accent)">add image</span></div>`;
                  p.appendChild(d);
                }
              }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.65))", padding: "20px 10px 8px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#fff", letterSpacing: "0.05em" }}>{g.label}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", animation: "lightboxIn 0.2s ease forwards" }}>
          <img src={lightbox} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 8, objectFit: "contain", animation: "lightboxImgIn 0.25s cubic-bezier(0.34,1.4,0.64,1) forwards" }} />
          <button style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────

function Header({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)", position: "sticky", top: 0, zIndex: 50, boxShadow: "var(--shadow)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--text)", textDecoration: "none", letterSpacing: "0.04em" }}>
          madb<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {["Skills", "Projects", "Journey", "Gallery", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-item" style={{ display: "none" }}>{l}</a>
          ))}
          <a href="mailto:madbcsu@gmail.com" className="nav-item">Contact</a>
          <a href="#gallery" className="nav-item">Gallery</a>
          <a href="#skills" className="nav-item">Skills</a>
          <button onClick={() => setDark(!dark)}
            style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", padding: "5px 7px", borderRadius: 4, display: "flex", alignItems: "center", transition: "border-color 0.2s" }}
            aria-label="Toggle theme">
            {dark ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO CARD ────────────────────────────────────────────────────────────

function HeroCard({ dark }: { dark: boolean }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      {/* Top rown: photo + name + actions */}
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ width: 88, height: 88, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", flexShrink: 0 }}>
          <img
            src={dark ? "/BisoyPic02.png" : "/BisoyPic01.png"}
            alt="Mary Adrianne D. Bisoy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.4s" }}
            onError={e => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=MADB&background=${dark ? "222" : "e5e5e5"}&color=${dark ? "52b788" : "2d6a4f"}&size=200&font-size=0.35&bold=true`; }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em" }}>
              Mary Adrianne D. Bisoy
            </h1>
            <span className="status-badge" style={{ display: "inline-flex", alignItems: "center", gap: 5, border: "1px solid var(--accent)", borderRadius: 12, padding: "2px 10px" }}>
              <div className="pulse" style={{ width: 6, height: 6 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>OPEN TO CONNECT</span>
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", letterSpacing: "0.06em", marginBottom: 6 }}>YxnZx · madb</p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 8 }}>
            Information Science Student · Web Developer · Cybersecurity Enthusiast
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-subtle)", fontSize: 12 }}>
            <MapPin size={12} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>Agusan del Norte, Philippines</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Action buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {[
          { label: "Send Email", icon: Mail, href: "mailto:madbcsu@gmail.com" },
          { label: "GitHub", icon: GitFork, href: "https://github.com/Marshmallow707" },
          { label: "LinkedIn", icon: Link2, href: "https://www.linkedin.com/in/dri-bisoy-a5648b352/" },
          { label: "Reddit", icon: Share2, href: "https://www.reddit.com/user/Boring_Ad7860/" },
          { label: "Otaku Blog", icon: BookOpen, href: "https://marshmallow707.github.io/YxnZxTW" },
        ].map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", border: "1px solid var(--border)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none", background: "var(--bg-secondary)", transition: "all 0.15s", letterSpacing: "0.03em" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
            <Icon size={12} /> {label}
          </a>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["BSIS @ CSU", "3rd Year", "Web Dev", "Cybersecurity", "AI Ethics", "Former GDSC", "Vibe Coder"].map(t => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT CARD ───────────────────────────────────────────────────────────

function AboutCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <p className="sec-title">About</p>
      <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75, marginBottom: expanded ? 12 : 0 }}>
        I'm a 3rd-year Information Science student at Caraga State University, known online as YxnZx or madb. My journey started with HTML in Senior High, evolved through Data Science and Python at USTP CDO — where I served as a GDSC Tech Ambassador — and brought me back to CSU with a growing stack in web development.
      </p>
      {expanded && (
        <>
          <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75, marginBottom: 10 }}>
            Here's something personal: back in junior high, I dreamed of becoming a White Hat Hacker. I had fallen victim to online scams myself, and I wanted to protect others from the same. That experience shaped how I see technology — not just as something to build with, but as a responsibility.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.75 }}>
            I am aware of where I am: still learning, still figuring things out. But I show up, I push through the confusion, and I keep building. That's enough for now.
          </p>
        </>
      )}
      <button onClick={() => setExpanded(!expanded)}
        style={{ marginTop: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
        {expanded ? "Show less" : "Read more"} <ChevronRight size={12} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
      </button>
    </div>
  );
}

// ─── SKILLS CARD ─────────────────────────────────────────────────────────

function SkillsCard() {
  return (
    <div className="card" id="skills" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p className="sec-title" style={{ marginBottom: 0 }}>Tech Stack</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {Object.entries(SKILLS).map(([cat, val]) => (
          <div key={cat}>
            <span className="skill-cat">{cat}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(val.items || []).map(s => <span key={s} className="chip">{s}</span>)}
              {(val.upcoming || []).map(s => (
                <span key={s} className="chip" style={{ borderStyle: "dashed", opacity: 0.6 }}>{s} ↗</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-subtle)" }}>↗ upcoming / currently learning</p>
    </div>
  );
}

// ─── PROJECTS CARD ────────────────────────────────────────────────────────

function ProjectsCard() {
  return (
    <div className="card" id="projects" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p className="sec-title" style={{ marginBottom: 0 }}>Recent Projects</p>
        <a href="#projects" className="view-all">View All <ChevronRight size={12} /></a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {PROJECTS.map((p, i) => (
          <div key={i} style={{ padding: "14px", border: `1px solid ${p.highlight ? "var(--accent)" : "var(--border)"}`, borderRadius: 6, background: "var(--bg-secondary)", transition: "border-color 0.15s, transform 0.15s", cursor: "default", position: "relative" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = p.highlight ? "var(--accent)" : "var(--border)"; e.currentTarget.style.transform = "none"; }}>
            {p.highlight && <span style={{ position: "absolute", top: 8, right: 8, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: 2, padding: "1px 5px", letterSpacing: "0.08em" }}>HIGHLIGHT</span>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--text)", lineHeight: 1.3, paddingRight: p.highlight ? 56 : 0 }}>{p.name}</p>
              {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", flexShrink: 0 }}><ExternalLink size={12} /></a>}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.tags.map(t => <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CERTS CARD ───────────────────────────────────────────────────────────

function CertsCard() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p className="sec-title" style={{ marginBottom: 0 }}>Recent Certifications</p>
      </div>
      {CERTS.map((c, i) => (
        <div key={i} className="cert-row">
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{c.name}</p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{c.issuer}</p>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)" }}>{c.year}</span>
        </div>
      ))}
      <div className="cert-row" style={{ borderStyle: "dashed", opacity: 0.6 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>More coming · 2026</p>
      </div>
    </div>
  );
}

// ─── MEMBERSHIPS CARD ─────────────────────────────────────────────────────

function MembershipsCard() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <p className="sec-title">Memberships & Community</p>
      {MEMBERSHIPS.map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: i < MEMBERSHIPS.length - 1 ? "1px solid var(--border)" : "none" }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{m.name}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.role}</p>
          </div>
          {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", marginLeft: 8, flexShrink: 0 }}><ExternalLink size={12} /></a>}
        </div>
      ))}
    </div>
  );
}

// ─── EXPERIENCE (RIGHT COL) ───────────────────────────────────────────────

function ExperienceCard() {
  return (
    <div className="card" id="journey" style={{ marginBottom: 16 }}>
      <p className="sec-title">Experience & Education</p>
      {EXPERIENCE.map((e, i) => (
        <div key={i} className="exp-row">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ marginTop: 3, flexShrink: 0 }}>
                {e.type === "org" ? <Star size={12} style={{ color: "var(--accent)" }} /> :
                 e.type === "milestone" ? <Code2 size={12} style={{ color: "var(--accent)" }} /> :
                 <GraduationCap size={12} style={{ color: "var(--text-muted)" }} />}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", lineHeight: 1.3 }}>{e.role}</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{e.org}</p>
              </div>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)", flexShrink: 0 }}>{e.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── GOALS CARD (replaces Recommendations) ───────────────────────────────

function GoalsCard() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <p className="sec-title">What I'm Working Toward</p>
      {GOALS.map((g, i) => (
        <div key={i} className="goal-card">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <g.icon size={14} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{g.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── QUICK INFO CARD ──────────────────────────────────────────────────────

function QuickInfoCard() {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <p className="sec-title">Quick Info</p>
      {[
        ["Program", "BSIS — Information Science"],
        ["University", "Caraga State University (Main)"],
        ["Prev. Univ.", "USTP — Main Campus, CDO"],
        ["Location", "Agusan del Norte, Philippines"],
        ["Status", "Actively Learning"],
        ["Email", "madbcsu@gmail.com"],
      ].map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", flexShrink: 0 }}>{k}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "right" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────

function GallerySection() {
  return (
    <div id="gallery" style={{ marginTop: 8 }}>
      <div className="card">
        <p className="sec-title" style={{ marginBottom: 20 }}>Gallery</p>
        <GalleryStrip items={GALLERY_CERTS} title="Certificates" />
        <GalleryStrip items={GALLERY_PROJECTS} title="Project Showcase" />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-subtle)" }}>
          · click to enlarge
        </p>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 48, padding: "24px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-subtle)" }}>
          © 2026 Mary Adrianne D. Bisoy. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            { href: "https://github.com/Marshmallow707", Icon: GitFork },
            { href: "https://www.linkedin.com/in/dri-bisoy-a5648b352/", Icon: Link2 },
            { href: "https://www.reddit.com/user/Boring_Ad7860/", Icon: Share2 },
          ].map(({ href, Icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-subtle)", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-subtle)")}>
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main>
      <Header dark={dark} setDark={setDark} />

      {/* Main two-column layout */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        <div className="two-col" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

          {/* LEFT COLUMN */}
          <div className="left-col fade-in" style={{ flex: "1 1 0", minWidth: 0 }}>
            <HeroCard dark={dark} />
            <AboutCard />
            <SkillsCard />
            <ProjectsCard />
            <CertsCard />
            <MembershipsCard />
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col fade-in-2" style={{ width: 280, flexShrink: 0 }}>
            <QuickInfoCard />
            <ExperienceCard />
            <GoalsCard />
          </div>

        </div>

        {/* Full-width gallery */}
        <GallerySection />
      </div>

      <Footer />
      <ChatWidget />
    </main>
  );
}
