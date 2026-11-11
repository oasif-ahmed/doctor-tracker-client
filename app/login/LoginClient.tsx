"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, ShieldCheck, Stethoscope, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Login failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 border border-border bg-card overflow-hidden">
        
        {/* Left Side: Modern Brand Panel */}
        <div className="relative p-10 lg:p-14 bg-muted/40 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary flex items-center justify-center text-primary-foreground">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                Doctor Tracker
              </span>
            </Link>

            <div className="space-y-3 pt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider border border-border">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Admin Portal
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Secure clinical records & provider management.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access your central health administration hub with real-time patient load metrics, verified doctor credentials, and intake telemetry.
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-3 border-t border-border mt-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Security Protocol</span>
              <span className="font-mono text-foreground font-medium">AES-256 / HttpOnly JWT</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>System Uptime</span>
              <span className="font-mono text-foreground font-medium">99.98% High Availability</span>
            </div>
          </div>
        </div>

        {/* Right Side: Spacious Form Panel */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Sign In to Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your clinical administrative credentials below.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 text-sm bg-background border-input focus-visible:ring-1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider font-semibold text-foreground">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 text-sm bg-background border-input focus-visible:ring-1"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-sm font-semibold tracking-wide uppercase transition-all duration-150 gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Authenticate & Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Don&apos;t have an administrator account?</span>
            <Link href="/register" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Register here <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
