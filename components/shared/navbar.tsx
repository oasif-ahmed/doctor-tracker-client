"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, LogIn, LogOut, UserPlus, Stethoscope, LayoutDashboard, Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check auth state on mount and route change
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001"}/api/auth/me`, { cache: "no-store", credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(Boolean(data.isAuthenticated));
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001"}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground transition-transform group-hover:scale-105">
            <Stethoscope className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Doctor Tracker
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/dashboard"
                ? "bg-secondary text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <Link
            href="/doctor"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              pathname.startsWith("/doctor")
                ? "bg-secondary text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Doctors
          </Link>
          <Link
            href="/patients"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              pathname.startsWith("/patients")
                ? "bg-secondary text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Patients
          </Link>
        </nav>

        {/* Auth Action Buttons */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider border-border"
              >
                <Link href="/dashboard" className="gap-1.5">
                  Portal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-xs font-semibold uppercase tracking-wider gap-1.5 text-muted-foreground hover:text-destructive"
                title="Log out of your account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                <Link href="/login" className="gap-1.5">
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="text-xs font-semibold uppercase tracking-wider"
              >
                <Link href="/register" className="gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
