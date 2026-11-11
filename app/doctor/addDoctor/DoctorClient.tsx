"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Stethoscope } from "lucide-react";
import { createDoctor } from "@/services/createDoctor.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState = null;

export default function DoctorPageClient() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createDoctor,
    initialState
  );

  useEffect(() => {
    if (state) {
      router.push("/doctor");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="max-w-xl mx-auto px-6 py-12 font-sans">
      <Link
        href="/doctor"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Doctors
      </Link>

      <div className="p-8 rounded-3xl bg-card border border-border space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Add New Doctor
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the physician credential details below.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="doc-name">Full Name</Label>
            <Input
              id="doc-name"
              type="text"
              name="name"
              required
              placeholder="Dr. John Doe"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="doc-spec">Specialization</Label>
            <Input
              id="doc-spec"
              type="text"
              name="specialization"
              required
              placeholder="Cardiology"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="doc-hosp">Hospital / Clinical Facility</Label>
            <Input
              id="doc-hosp"
              type="text"
              name="hospital"
              required
              placeholder="City General Hospital"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="doc-phone">Phone Number</Label>
              <Input
                id="doc-phone"
                type="text"
                name="phone"
                required
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="doc-email">Email Address</Label>
              <Input
                id="doc-email"
                type="email"
                name="email"
                required
                placeholder="doctor@hospital.com"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/doctor")}
              className="rounded-full"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full gap-2 px-6"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Stethoscope className="w-4 h-4" />
              )}
              {isPending ? "Saving..." : "Save Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
