import {
  Calendar,
  TrendingUp,
  Users,
  MessageSquare,
  Mail,
  DollarSign,
  Shield,
  BookOpen,
  Heart,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { RoleCard } from "@/components/shared/RoleCard";

export default function LandingPage() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 bg-blob animate-glow" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-600/10 bg-blob animate-glow [animation-delay:2s]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-cyan-600/10 bg-blob animate-glow [animation-delay:4s]" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8 animate-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/5 text-xs font-bold tracking-widest text-indigo-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Now in Private Beta
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
              Next-Gen <br />
              <span className="text-gradient">University Hub</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
              A unified core for attendance, mentoring, and academics.
              Elevate your institution with real-time tracking and intelligent updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/register">
                <Button size="lg" className="rounded-2xl px-10 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="ghost" className="rounded-2xl px-10 h-16 glass border-white/10 text-white font-bold text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-24 relative animate-reveal [animation-delay:0.4s]">
            <div className="relative z-10 w-full max-w-4xl mx-auto aspect-video glass rounded-[2rem] p-4 animate-float border-white/5 shadow-2xl">
              <div className="w-full h-full bg-zinc-900/50 rounded-[1.5rem] flex items-center justify-center border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent pointer-events-none" />
                <span className="text-zinc-600 font-black tracking-widest uppercase italic">Dashboard Intelligence</span>
              </div>
            </div>
            {/* Glow behind the illustration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-indigo-600/20 blur-[100px] -z-10" />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-24 animate-reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              The <span className="text-indigo-400">Core</span> Advantage
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium">
              Every tool orchestrated to work in harmony, giving you a 360° view of the academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-reveal [animation-delay:0.2s]">
            <FeatureCard
              icon={Calendar}
              title="Attendance AI"
              description="Automated tracking with smart-heatmap predictions."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Predictive Analytics"
              description="Identify performance trends before they become issues."
            />
            <FeatureCard
              icon={Users}
              title="Mentor Velocity"
              description="Direct high-speed communication with academic guides."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Query Engine"
              description="Raise and resolve doubts with threaded conversations."
            />
            <FeatureCard
              icon={Mail}
              title="Pulse Alerts"
              description="Real-time multi-channel notifications for stakeholders."
            />
            <FeatureCard
              icon={DollarSign}
              title="Fin-Core"
              description="Transparent fee tracking and digital invoicing."
            />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-32 relative z-10 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-24 animate-reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Tailored for <span className="text-gradient">Every Role</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium">
              Multi-dimensional access control ensures every stakeholder sees exactly what they need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-reveal [animation-delay:0.2s]">
            <RoleCard
              icon={Shield}
              role="Admin"
              capabilities={[
                "Full System Orchestration",
                "Advanced Financial Controls",
                "Entity Lifecycle Management",
                "Cross-Section Analytics"
              ]}
            />
            <RoleCard
              icon={BookOpen}
              role="Teacher"
              capabilities={[
                "Interactive Attendance",
                "Dynamic Test Architect",
                "Performance Data Entry",
                "Session Management"
              ]}
            />
            <RoleCard
              icon={Heart}
              role="Mentor"
              capabilities={[
                "Holistic Student Views",
                "Direct Velocity Messaging",
                "Early Warning Signals",
                "Progress Assessments"
              ]}
            />
            <RoleCard
              icon={GraduationCap}
              role="Student"
              capabilities={[
                "Personal Progress Hub",
                "Integrated Debt Solver",
                "Attendance Health Meter",
                "Exam Strategy Tracker"
              ]}
            />
            <RoleCard
              icon={Users}
              role="Parent"
              capabilities={[
                "Ward Health Heatmap",
                "Direct Mentor Link",
                "Instant Status Pushes",
                "Fee Transparency Suite"
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-24">
          <div className="space-y-6 animate-reveal">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Onboarding Flow</h2>
            <p className="text-zinc-500 text-lg font-medium">Start your digital transformation in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative animate-reveal [animation-delay:0.2s]">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] glass border-indigo-500/30 mx-auto flex items-center justify-center text-3xl font-black text-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.2)] group-hover:scale-110 transition-transform">1</div>
              <h3 className="mt-8 text-2xl font-bold text-white">Cloud Sync</h3>
              <p className="mt-4 text-zinc-500 font-medium">Register and sync your existing records with our secure hub.</p>
            </div>
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] glass border-violet-500/30 mx-auto flex items-center justify-center text-3xl font-black text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.2)] group-hover:scale-110 transition-transform">2</div>
              <h3 className="mt-8 text-2xl font-bold text-white">Entity Assignment</h3>
              <p className="mt-4 text-zinc-500 font-medium">Automatic smart-matching of mentors, students, and sessions.</p>
            </div>
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] glass border-cyan-500/30 mx-auto flex items-center justify-center text-3xl font-black text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">3</div>
              <h3 className="mt-8 text-2xl font-bold text-white">Full Throttle</h3>
              <p className="mt-4 text-zinc-500 font-medium">Initiate real-time tracking and gain immediate visibility.</p>
            </div>

            {/* Visual connector (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative z-10 px-4">
        <div className="max-w-4xl mx-auto glass rounded-[3rem] p-12 lg:p-20 text-center space-y-10 border-white/10 shadow-[0_0_100px_rgba(79,70,229,0.1)] animate-reveal">
          <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Ready to <span className="text-gradient">Modernize</span>?
          </h2>
          <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Join the elite institutions using TAMS to streamline their academic operations.
          </p>
          <div className="pt-6">
            <Link href="/register">
              <Button size="lg" className="rounded-2xl px-12 h-20 bg-white text-black font-black text-xl hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                Secure Your Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div id="about" />
    </div>
  );
}
