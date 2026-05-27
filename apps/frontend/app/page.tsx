'use client'

import { useState, useEffect, useRef } from "react"
import {
  Pencil,
  Share2,
  Lock,
  Users,
  Layers,
  Zap,
  Download,
  ArrowRight,
  Menu,
  X,
  Star,
  Code2,
  Globe,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import Image from "next/image"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

const features = [
  {
    icon: Pencil,
    title: "Hand-drawn feel",
    description:
      "Every stroke feels natural and human. Sketchy rendering gives your diagrams warmth that polished tools can't replicate.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Users,
    title: "Real-time collaboration",
    description:
      "Multiple cursors, live updates. Work with your team simultaneously no matter where they are in the world.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Lock,
    title: "End-to-end encrypted",
    description:
      "Your data never leaves your device unencrypted. Private rooms are secured with keys that only you hold.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Share2,
    title: "Instant sharing",
    description:
      "Share a live link in seconds. No accounts required for collaborators — just click and draw.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Layers,
    title: "Infinite canvas",
    description:
      "Zoom and pan across an endless whiteboard. Group, align, and layer elements with precision.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Download,
    title: "Export anywhere",
    description:
      "Export to PNG, SVG, or the open .excalidraw format. Embed in Notion, Confluence, and more.",
    color: "bg-orange-50 text-orange-600",
  },
]

const testimonials = [
  {
    quote:
      "Excalidraw is the only diagramming tool I've used where the output actually looks better than a whiteboard.",
    author: "Sarah Chen",
    role: "Staff Engineer, Linear",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
  },
  {
    quote:
      "We use it for every architecture review, every retro, every design sprint. It just gets out of the way.",
    author: "Marcus Webb",
    role: "CTO, Depot",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
  },
  {
    quote:
      "The E2E encryption sealed it for us. We can sketch sensitive system diagrams without worrying.",
    author: "Priya Nair",
    role: "Security Lead, Vercel",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2",
  },
]

const stats = [
  { value: "40K+", label: "GitHub stars" },
  { value: "5M+", label: "Monthly users" },
  { value: "100+", label: "Contributors" },
  { value: "180+", label: "Countries" },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: (typeof features)[0] & { delay: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon size={22} />
      </div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  delay,
}: (typeof testimonials)[0] & { delay: number }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={author}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-gray-900 font-semibold text-sm">{author}</p>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  )
}

function CanvasPreview() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="bg-gray-100 rounded-t-2xl px-4 py-3 flex items-center gap-2 border border-gray-200 border-b-0">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-emerald-400" />
        <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200">
          excalidraw.com
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-b-2xl overflow-hidden shadow-2xl shadow-gray-200/80">
        <svg
          viewBox="0 0 720 400"
          className="w-full"
          style={{ fontFamily: "Virgil, cursive" }}
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#e5e7eb" />
            </pattern>
          </defs>
          <rect width="720" height="400" fill="url(#dots)" />

          <rect x="60" y="60" width="160" height="80" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 1" />
          <text x="140" y="106" textAnchor="middle" fontSize="14" fill="#92400e">User Service</text>

          <rect x="280" y="60" width="160" height="80" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 1" />
          <text x="360" y="106" textAnchor="middle" fontSize="14" fill="#1e3a8a">Auth Service</text>

          <rect x="500" y="60" width="160" height="80" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 1" />
          <text x="580" y="106" textAnchor="middle" fontSize="14" fill="#14532d">DB Layer</text>

          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6b7280" />
            </marker>
          </defs>

          <path d="M222 100 C252 100 252 100 278 100" stroke="#6b7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 1" />
          <path d="M442 100 C472 100 472 100 498 100" stroke="#6b7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 1" />
          <path d="M580 142 L580 185" stroke="#6b7280" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 1" />

          <ellipse cx="580" cy="195" rx="50" ry="12" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3 1" />
          <rect x="530" y="195" width="100" height="45" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3 1" />
          <ellipse cx="580" cy="240" rx="50" ry="12" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" />
          <text x="580" y="222" textAnchor="middle" fontSize="12" fill="#374151">Postgres</text>

          <g transform="translate(55, 200)">
            <rect x="0" y="0" width="190" height="110" rx="4" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 1" />
            <text x="10" y="22" fontSize="12" fill="#9a3412" fontWeight="bold">TODO</text>
            <text x="10" y="42" fontSize="11" fill="#7c2d12">- Add rate limiting</text>
            <text x="10" y="58" fontSize="11" fill="#7c2d12">- JWT refresh logic</text>
            <text x="10" y="74" fontSize="11" fill="#7c2d12">- Session store</text>
            <text x="10" y="90" fontSize="11" fill="#7c2d12">- Audit logging</text>
          </g>

          <g transform="translate(320, 230)">
            <path d="M0 0 L0 18 L5 14 L8 20 L10 19 L7 13 L13 13 Z" fill="#2563eb" />
            <rect x="14" y="4" width="52" height="18" rx="9" fill="#2563eb" />
            <text x="40" y="17" textAnchor="middle" fontSize="10" fill="white">Priya</text>
          </g>

          <g transform="translate(430, 290)">
            <path d="M0 0 L0 18 L5 14 L8 20 L10 19 L7 13 L13 13 Z" fill="#16a34a" />
            <rect x="14" y="4" width="58" height="18" rx="9" fill="#16a34a" />
            <text x="43" y="17" textAnchor="middle" fontSize="10" fill="white">Marcus</text>
          </g>

          <rect x="15" y="15" width="32" height="370" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          {[40, 80, 120, 160, 200, 240].map((y, i) => (
            <rect key={i} x="22" y={y} width="18" height="18" rx="4" fill={i === 0 ? "#eff6ff" : "transparent"} stroke={i === 0 ? "#3b82f6" : "#d1d5db"} strokeWidth="1" />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <Pencil size={16} className="text-white" />
            </div>
            <span className="text-gray-900 font-extrabold text-lg tracking-tight">excalidraw</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Blog", "Docs"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 hover:text-gray-900 text-sm font-semibold transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/excalidraw/excalidraw"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-semibold transition-colors"
            >
              <img src="/github.svg" alt="github" sizes="16"/>
              
              GitHub
            </a>
            <a
              href="#"
              className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Start drawing
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {["Features", "Pricing", "Blog", "Docs"].map((item) => (
              <a key={item} href="#" className="text-gray-700 font-semibold text-sm">
                {item}
              </a>
            ))}
            <a
              href="#"
              className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-xl text-center mt-2"
            >
              Start drawing
            </a>
          </div>
        )}
      </header>

      <section className="pt-32 pb-20 px-6 text-center bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-amber-700 text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Open source &amp; free forever
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.08] tracking-tight mb-6">
            Draw like you're{" "}
            <span className="relative inline-block">
              <span className="relative z-10">thinking</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                height="10"
              >
                <path
                  d="M2 8 Q50 2 100 7 Q150 12 198 6"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            An open-source whiteboard with a hand-drawn feel. Collaborate in real time with end-to-end
            encryption. No account needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#"
              className="group flex items-center gap-2 bg-gray-900 text-white font-bold text-base px-6 py-3.5 rounded-2xl hover:bg-gray-700 transition-all shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20"
            >
              Start drawing — it's free
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://github.com/excalidraw/excalidraw"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 font-bold text-base px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <img src="/github.svg" alt="github" sizes="18"/>
              View on GitHub
            </a>
          </div>

          <CanvasPreview />
        </div>
      </section>

      <section className="py-16 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-black text-gray-900 tabular-nums">{value}</p>
              <p className="text-gray-400 text-sm font-semibold mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Everything you need to sketch
            </h2>
            <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto">
              Powerful enough for engineers. Simple enough for anyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3">Use cases</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Built for every kind of thinker
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "Engineering teams",
                items: ["System architecture diagrams", "ERD and data flow", "API contract sketches", "Incident runbooks"],
                color: "from-sky-50 to-sky-100/50",
                iconColor: "text-sky-600 bg-sky-100",
              },
              {
                icon: Zap,
                title: "Product & design",
                items: ["Wireframes & low-fi mockups", "User journey maps", "Feature brainstorming", "Stakeholder presentations"],
                color: "from-amber-50 to-amber-100/50",
                iconColor: "text-amber-600 bg-amber-100",
              },
              {
                icon: Globe,
                title: "Education & research",
                items: ["Concept maps", "Lecture diagrams", "Research synthesis", "Study group whiteboards"],
                color: "from-emerald-50 to-emerald-100/50",
                iconColor: "text-emerald-600 bg-emerald-100",
              },
            ].map(({ icon: Icon, title, items, color, iconColor }) => (
              <div
                key={title}
                className={`bg-linear-to-br ${color} border border-white rounded-2xl p-7 shadow-sm`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${iconColor}`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-gray-900 font-extrabold text-lg mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                      <ChevronRight size={14} className="text-gray-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-rose-500 font-bold text-sm uppercase tracking-widest mb-3">Loved by teams</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Don't take our word for it
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.author} {...t} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
           
             <img src="/github.svg" alt="github" sizes="28"/>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-5">
            Proudly open source
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Excalidraw is MIT-licensed and built by hundreds of contributors. Embed it in your own app,
            extend it with plugins, or just use it for free — forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/excalidraw/excalidraw"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white font-bold text-base px-6 py-3.5 rounded-2xl hover:bg-gray-700 transition-all"
            >
             <img src="/github.svg" alt="github" sizes="18"/>
              Star on GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-600 font-bold text-base px-6 py-3.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Read the docs
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
            Your next great idea starts with a sketch
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            No sign-up. No credit card. Just open a canvas and start drawing.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-white text-gray-900 font-extrabold text-lg px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-xl shadow-black/20"
          >
            Open Excalidraw
            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      <footer className="bg-gray-950 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                <Pencil size={14} className="text-white" />
              </div>
              <span className="text-white font-extrabold text-base">excalidraw</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-3 text-sm">
              {["Features", "Pricing", "Blog", "Docs", "GitHub", "Twitter", "Discord", "Privacy"].map(
                (item) => (
                  <a key={item} href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2024 Excalidraw. MIT License.</p>
            <p>Made with love by the open-source community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
