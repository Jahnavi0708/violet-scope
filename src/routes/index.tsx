import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Blocks,
  Braces,
  BrainCircuit,
  ChevronRight,
  Cloud,
  Code2,
  CodeXml,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Network,
  Orbit,
  Sparkles,
  Terminal,
  Trophy,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import scopeOrb from "@/assets/scope-orb.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCOPE Club — Where Curiosity Meets Code" },
      {
        name: "description",
        content:
          "Explore SCOPE Club, a student technology community for learning, coding, projects, hackathons, and cloud experiences.",
      },
      { property: "og:title", content: "SCOPE Club — Where Curiosity Meets Code" },
      {
        property: "og:description",
        content: "Learn, build, compete, and connect with SCOPE Club.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScopeHome,
});

const navigation = [
  { label: "Home", id: "home" },
  { label: "Inside SCOPE", id: "inside" },
  { label: "What We Do", id: "what-we-do" },
  { label: "Events", id: "events" },
  { label: "Resources", id: "resources" },
  { label: "Contact", id: "contact" },
];

const principles: { title: string; description: string; icon: LucideIcon; code: string }[] = [
  { title: "Learn", description: "Explore technologies and strengthen technical fundamentals.", icon: BrainCircuit, code: "01" },
  { title: "Build", description: "Turn ideas into projects and practical experiences.", icon: Blocks, code: "02" },
  { title: "Compete", description: "Participate in hackathons and coding contests.", icon: Trophy, code: "03" },
  { title: "Connect", description: "Meet students interested in technology and collaborate.", icon: Users, code: "04" },
];

const activities: { title: string; description: string; icon: LucideIcon; mark: string }[] = [
  { title: "Hackathons", description: "Build solutions, solve problems, and work with teams.", icon: Zap, mark: "BUILD / 01" },
  { title: "Coding Contests", description: "Challenge your programming skills and improve problem-solving.", icon: Code2, mark: "SOLVE / 02" },
  { title: "Projects", description: "Build real projects and transform ideas into working solutions.", icon: Layers3, mark: "SHIP / 03" },
];

const resources: { title: string; description: string; icon: LucideIcon; label: string }[] = [
  { title: "App Development", description: "Shape useful ideas into complete mobile experiences.", icon: Blocks, label: "MOBILE" },
  { title: "Python", description: "Learn clear programming foundations and practical automation.", icon: Braces, label: "LANGUAGE" },
  { title: "FrontEnd", description: "Craft responsive, accessible, and expressive web interfaces.", icon: CodeXml, label: "INTERFACE" },
  { title: "BackEnd", description: "Understand APIs, data, and the systems behind products.", icon: Database, label: "SYSTEMS" },
];

function ScopeHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 700);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.1, 0.35] },
    );
    document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => observer.observe(section));
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const moveTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="fixed inset-x-0 top-0 z-[70] h-px bg-border">
        <div className="h-full bg-primary shadow-[var(--shadow-primary)] transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg border border-border bg-nav px-4 shadow-[var(--shadow-nav)] backdrop-blur-2xl sm:px-5">
          <button className="group flex items-center gap-3" onClick={() => moveTo("home")} aria-label="SCOPE Club home">
            <span className="grid size-9 place-items-center rounded-md border border-primary/50 bg-primary/10 font-mono text-sm font-medium text-primary shadow-[var(--shadow-primary-soft)] transition-transform group-hover:rotate-6">S</span>
            <span className="font-display text-sm font-bold tracking-[0.18em]">SCOPE <span className="text-muted-foreground">CLUB</span></span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <button key={item.id} onClick={() => moveTo(item.id)} className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground"><span className="size-1.5 rounded-full bg-status shadow-[var(--shadow-status)]" />System online</span>
            <Button variant="glass" size="sm" asChild><a href="#contact">Connect <ArrowRight /></a></Button>
          </div>

          <Button variant="icon" size="icon" className="lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </nav>

        {menuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-lg border border-border bg-nav p-2 shadow-[var(--shadow-nav)] backdrop-blur-2xl lg:hidden">
            {navigation.map((item) => (
              <button key={item.id} onClick={() => moveTo(item.id)} className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm ${activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                {item.label}<ChevronRight className="size-4" />
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-atmosphere relative flex min-h-[92svh] items-center border-b border-border pt-28">
          <img src={scopeOrb} alt="Luminous violet orbital structure surrounding a crystalline core" width={1400} height={1200} fetchPriority="high" className="hero-art absolute inset-y-0 right-0 h-full w-full object-cover object-[68%_center] opacity-80" />
          <div className="hero-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:px-10">
            <div className="max-w-4xl">
              <div className="hero-enter mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-2 font-mono text-[10px] uppercase text-primary backdrop-blur-md sm:text-xs">
                <Sparkles className="size-3.5" /> AWS Cloud Trek 2026 <span className="h-3 w-px bg-primary/40" /> SCOPE / V1.0
              </div>
              <h1 className="hero-enter-delay font-display text-[clamp(4.3rem,13vw,10.5rem)] font-bold leading-[0.76] tracking-normal">
                SCOPE<br /><span className="text-stroke-purple">CLUB</span>
              </h1>
              <div className="hero-enter-delay-2 mt-9 grid max-w-3xl gap-6 border-l border-primary/60 pl-5 sm:grid-cols-[1fr_1.3fr] sm:pl-7">
                <p className="font-display text-xl font-medium leading-tight sm:text-2xl">Where Curiosity<br /><span className="text-primary">Meets Code.</span></p>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">A student technology community focused on learning, building, coding, projects, and technical events.</p>
              </div>
              <div className="hero-enter-delay-2 mt-9 flex flex-wrap gap-3">
                <Button variant="hero" size="lg" asChild><a href="#inside">Explore SCOPE <ArrowDown /></a></Button>
                <Button variant="glass" size="lg" asChild><a href="#events">View Events <ArrowRight /></a></Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 right-5 hidden items-center gap-3 font-mono text-[10px] uppercase text-muted-foreground sm:flex lg:right-10"><span>Scroll to explore</span><span className="grid size-8 place-items-center rounded-full border border-border"><ArrowDown className="size-3.5 animate-bounce" /></span></div>
        </section>

        <section className="border-b border-border bg-surface-subtle py-6" aria-label="SCOPE principles">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 font-mono text-[10px] uppercase text-muted-foreground sm:px-8 lg:px-10">
            <span className="text-primary">// Community protocol</span>
            {principles.map((item, index) => <span key={item.title} className="flex items-center gap-3"><span className="text-primary">0{index + 1}</span>{item.title}</span>)}
          </div>
        </section>

        <section id="inside" className="section-shell">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="01 / Inside SCOPE" title="Built for the curious." description="SCOPE is a technology-focused student community where students explore technology, develop skills, participate in technical activities, and build projects." />
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((item, index) => <FeatureCard key={item.title} {...item} delay={index} />)}
            </div>
          </div>
        </section>

        <section id="what-we-do" className="section-shell tech-grid border-y border-border bg-surface-subtle">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="02 / The work" title="Learn by doing." description="Practical spaces to think, experiment, collaborate, and turn technical curiosity into something real." />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {activities.map((item, index) => <ActivityCard key={item.title} {...item} delay={index} />)}
            </div>
          </div>
        </section>

        <section id="events" className="section-shell">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading eyebrow="03 / Events" title="Events & Experiences" description="Spaces designed for exploration, hands-on learning, creativity, and technical collaboration." />
            <div className="relative mt-14 grid gap-5 lg:grid-cols-12">
              <article className="event-feature reveal group relative overflow-hidden rounded-lg border border-primary/45 bg-card p-6 shadow-[var(--shadow-primary-soft)] sm:p-9 lg:col-span-7 lg:row-span-2">
                <div className="absolute inset-0 bg-event-glow opacity-80" aria-hidden="true" />
                <div className="event-orbit absolute -right-28 top-1/2 size-[25rem] -translate-y-1/2 rounded-full border border-primary/25" aria-hidden="true"><span className="absolute left-7 top-12 size-3 rounded-full bg-primary shadow-[var(--shadow-primary)]" /></div>
                <div className="relative flex min-h-[28rem] flex-col justify-between">
                  <div className="flex items-center justify-between"><span className="tag"><Cloud /> Featured experience</span><span className="font-mono text-[10px] text-primary">AWS / CLOUD / 2026</span></div>
                  <div className="max-w-xl">
                    <span className="mb-4 block font-mono text-xs uppercase text-primary">Today's Workshop</span>
                    <h3 className="font-display text-4xl font-bold sm:text-6xl">AWS Cloud<br />Trek <span className="text-primary">2026</span></h3>
                    <p className="mt-5 max-w-md leading-7 text-muted-foreground">A hands-on learning experience focused on AWS and cloud technologies.</p>
                    <a className="event-link mt-8 inline-flex items-center gap-2 text-sm font-medium" href="#resources">Explore Event <ArrowRight className="size-4" /></a>
                  </div>
                </div>
              </article>
              <EventCard category="Innovation" title="Zenith" description="Technology, creativity, and student innovation." icon={Orbit} />
              <EventCard category="Workshop" title="Today's Workshop" description="A current SCOPE learning experience built around AWS Cloud Trek 2026." icon={Terminal} />
            </div>
          </div>
        </section>

        <section id="resources" className="section-shell border-y border-border bg-surface-subtle">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading eyebrow="04 / Resource deck" title="Learning Resources" description="Choose a path, explore the foundations, and keep moving from understanding to making." />
              <p className="font-mono text-xs uppercase text-primary">Learn. Build. Experiment. Repeat.</p>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {resources.map((resource, index) => <ResourceCard key={resource.title} {...resource} delay={index} />)}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-field relative overflow-hidden border-b border-border py-28 sm:py-36">
          <div className="absolute inset-0 bg-contact-glow" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="reveal grid items-end gap-12 lg:grid-cols-[1fr_auto]">
              <div className="max-w-4xl">
                <p className="section-eyebrow">05 / Connect</p>
                <h2 className="mt-5 font-display text-5xl font-bold leading-[0.92] sm:text-7xl lg:text-8xl">Let's Build<br /><span className="text-primary">Something.</span></h2>
                <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground">Curious about technology, excited by ideas, or ready to collaborate? Connect with SCOPE and start a conversation.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:max-w-[15rem] lg:justify-end">
                <SocialLink href="https://www.instagram.com" label="Instagram" icon={Instagram} />
                <SocialLink href="https://www.linkedin.com" label="LinkedIn" icon={Linkedin} />
                <SocialLink href="mailto:?subject=Hello%20SCOPE%20Club" label="Email" icon={Mail} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-10 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div><p className="font-display text-2xl font-bold tracking-[0.15em]">SCOPE CLUB</p><p className="mt-2 text-sm text-muted-foreground">Where Curiosity Meets Code.</p></div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">{navigation.map((item) => <button key={item.id} onClick={() => moveTo(item.id)} className="transition-colors hover:text-primary">{item.label}</button>)}</div>
          </div>
          <div className="flex flex-col gap-3 pt-6 font-mono text-[10px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 SCOPE Club</span><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-status" />Built around curiosity</span></div>
        </div>
      </footer>

      <Button variant="icon" size="icon" aria-label="Back to top" onClick={() => moveTo("home")} className={`fixed bottom-5 right-5 z-40 shadow-[var(--shadow-nav)] transition-all duration-300 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}><ArrowUp /></Button>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="reveal max-w-3xl"><p className="section-eyebrow">{eyebrow}</p><h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-6xl">{title}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p></div>;
}

function FeatureCard({ title, description, icon: Icon, code, delay }: (typeof principles)[number] & { delay: number }) {
  return <article className="reveal feature-card group bg-card p-6 sm:p-7" style={{ transitionDelay: `${delay * 70}ms` }}><div className="flex items-start justify-between"><span className="icon-frame"><Icon /></span><span className="font-mono text-[10px] text-muted-foreground">{code} / 04</span></div><h3 className="mt-16 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-8 h-px w-10 bg-primary transition-all duration-300 group-hover:w-full" /></article>;
}

function ActivityCard({ title, description, icon: Icon, mark, delay }: (typeof activities)[number] & { delay: number }) {
  return <article className="reveal activity-card group relative overflow-hidden rounded-lg border border-border bg-card p-7" style={{ transitionDelay: `${delay * 80}ms` }}><div className="absolute -right-10 -top-10 size-32 rounded-full border border-primary/15 transition-transform duration-500 group-hover:scale-125" /><p className="font-mono text-[10px] text-primary">{mark}</p><Icon className="mt-16 size-9 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3" /><h3 className="mt-7 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-8 flex items-center gap-2 text-xs font-medium text-foreground">Explore discipline <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></div></article>;
}

function EventCard({ category, title, description, icon: Icon }: { category: string; title: string; description: string; icon: LucideIcon }) {
  return <article className="reveal group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 lg:col-span-5"><div className="flex items-start justify-between"><span className="tag"><Icon />{category}</span><span className="font-mono text-[10px] uppercase text-muted-foreground">SCOPE EVENT</span></div><h3 className="mt-12 font-display text-3xl font-semibold">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p><a className="event-link mt-7 inline-flex items-center gap-2 text-xs font-medium" href="#contact">Explore Event <ArrowRight className="size-4" /></a></article>;
}

function ResourceCard({ title, description, icon: Icon, label, delay }: (typeof resources)[number] & { delay: number }) {
  return <article className="reveal resource-card group rounded-lg border border-border bg-card p-5" style={{ transitionDelay: `${delay * 65}ms` }}><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary"><Icon className="size-5" /></span><span className="font-mono text-[9px] text-muted-foreground">{label}</span></div><h3 className="mt-9 font-display text-xl font-semibold">{title}</h3><p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">{description}</p><Button variant="glass" size="sm" className="mt-6 w-full" asChild><a href="#contact">Explore <ExternalLink /></a></Button></article>;
}

function SocialLink({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex min-w-36 items-center justify-between gap-4 rounded-md border border-primary/25 bg-surface-glass px-5 py-4 text-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/65 hover:bg-primary/10"><span>{label}</span><Icon className="size-4 text-primary transition-transform group-hover:scale-110" /></a>;
}