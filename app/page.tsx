import Link from "next/link";
import { 
  Users, 
  UserCheck, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3,
  CheckCircle2,
  Lock,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="relative border-b border-border py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold tracking-wider uppercase border border-border">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Clinical Intelligence & Governance
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
              Modern Clinical <br />
              <span className="text-muted-foreground font-light">Administration.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              A high-velocity platform engineered for healthcare staff coordination, patient records management, and real-time clinical intake analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-sm font-semibold tracking-wider uppercase gap-2">
                <Link href="/dashboard">
                  Access Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-sm font-semibold tracking-wider uppercase">
                <Link href="/doctor">
                  Physician Directory
                </Link>
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>REST API Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-primary" />
                <span>Protected JWT Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Multi-Facility Capable</span>
              </div>
            </div>
          </div>

          {/* Metric Dashboard Cards */}
          <div className="w-full lg:w-[440px] grid grid-cols-1 gap-4">
            <div className="p-6 bg-card border border-border flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Physicians</p>
                <h3 className="text-3xl font-extrabold text-foreground">24+ Specialists</h3>
                <p className="text-xs text-muted-foreground">Credentialed in cardiology, surgery & more</p>
              </div>
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>

            <div className="p-6 bg-card border border-border flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Managed Patients</p>
                <h3 className="text-3xl font-extrabold text-foreground">140+ Records</h3>
                <p className="text-xs text-muted-foreground">Active monitoring & diagnosis tracking</p>
              </div>
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="p-6 bg-card border border-border flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Intake Latency</p>
                <h3 className="text-3xl font-extrabold text-foreground">&lt; 15ms Query</h3>
                <p className="text-xs text-muted-foreground">Indexed MongoDB analytical pipelines</p>
              </div>
              <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl mb-14 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System Modules
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Enterprise clinical operations suite.
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything administrators need to track clinical capacity, assign cases, and update medical profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link 
            href="/dashboard"
            className="group p-8 bg-card border border-border hover:border-foreground/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center mb-6 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">Analytics Dashboard</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Visual charts displaying doctor allocations, condition distributions, and date-based intake telemetry.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground">
              Launch Analytics <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/doctor"
            className="group p-8 bg-card border border-border hover:border-foreground/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center mb-6 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">Physician Directory</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Supervise hospital credentials, filter by medical specialty, register new doctors, and inspect assigned panels.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground">
              Inspect Doctors <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/patients"
            className="group p-8 bg-card border border-border hover:border-foreground/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center mb-6 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2 text-foreground">Patient Registry</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full-spectrum patient directory with multi-field search, condition filtering, live record modification, and deletion.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-foreground">
              Manage Patients <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
