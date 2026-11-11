"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowRight, ShieldCheck, Stethoscope, User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Registration failed";
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
                <ShieldCheck className="w-3.5 h-3.5 text-primary" /> System Access
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Create your health administrative profile.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Join the platform to supervise medical staff, manage assigned patients, monitor active caseloads, and analyze clinical trends.
              </p>
            </div>
          </div>

          <div className="pt-10 space-y-3 border-t border-border mt-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Admin Privileges</span>
              <span className="font-mono text-foreground font-medium">Physician & Patient Management</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Audit Compliance</span>
              <span className="font-mono text-foreground font-medium">HIPAA Aligned Schema</span>
            </div>
          </div>
        </div>

        {/* Right Side: Spacious Register Form */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Administrator Registration
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill in your details to set up your management credentials.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="reg-name" className="text-xs uppercase tracking-wider font-semibold text-foreground">
                Full Name & Title
              </Label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="Dr. Admin Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 text-sm bg-background border-input focus-visible:ring-1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email" className="text-xs uppercase tracking-wider font-semibold text-foreground">
                Official Email Address
              </Label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
                <Input
                  id="reg-email"
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
              <Label htmlFor="reg-password" className="text-xs uppercase tracking-wider font-semibold text-foreground">
                Create Secure Password
              </Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3 pointer-events-none" />
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="Minimum 8 characters"
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
                  Register & Proceed to Login <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Already registered as an administrator?</span>
            <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Sign In <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
