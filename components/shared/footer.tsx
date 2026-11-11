"use client";

import Link from "next/link";
import { Stethoscope, Heart, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/60 backdrop-blur-sm text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Stethoscope className="w-4 h-4" />
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Doctor Tracker
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              An enterprise healthcare administrative portal for managing credentialed physicians, tracking clinical records, and monitoring operational intake metrics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/dashboard"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Dashboard Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/doctor"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Doctor Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/patients"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Patient Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/doctor/addDoctor"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Add New Doctor
                </Link>
              </li>
            </ul>
          </div>

          {/* System Status / Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Portal Status
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>REST API Services: Active</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span>Encrypted JWT Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="w-3.5 h-3.5 text-destructive" />
                <span>Compliant Clinical Logs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Doctor Tracker Portal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
