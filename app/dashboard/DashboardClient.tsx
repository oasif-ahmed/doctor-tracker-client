"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Users, Stethoscope, Activity, Calendar, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
}

interface Patient {
  _id: string;
  name: string;
  condition: string;
  doctorId: string;
  createdAt: string;
}

interface DashboardClientProps {
  doctors: Doctor[];
  patients: Patient[];
}

const COLORS = [
  "oklch(0.214 0.009 43.1)",
  "oklch(0.553 0.195 38.402)",
  "oklch(0.705 0.213 47.604)",
  "oklch(0.837 0.128 66.29)",
  "oklch(0.646 0.222 41.116)",
];

export default function DashboardClient({ doctors, patients }: DashboardClientProps) {
  const doctorPatientCount: Record<string, number> = {};
  patients.forEach((p) => {
    doctorPatientCount[p.doctorId] = (doctorPatientCount[p.doctorId] || 0) + 1;
  });

  const patientsPerDoctorData = doctors.map((doc) => ({
    name: doc.name.replace(/^Dr\.\s*/i, "").split(" ")[0],
    patients: doctorPatientCount[doc._id] || 0,
  }));

  const conditionCount: Record<string, number> = {};
  patients.forEach((p) => {
    conditionCount[p.condition] = (conditionCount[p.condition] || 0) + 1;
  });

  const conditionData = Object.keys(conditionCount).map((key) => ({
    name: key,
    value: conditionCount[key],
  }));

  const dateCount: Record<string, number> = {};
  patients.forEach((p) => {
    const date = new Date(p.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    dateCount[date] = (dateCount[date] || 0) + 1;
  });

  const dateData = Object.keys(dateCount).map((date) => ({
    date,
    count: dateCount[date],
  }));

  const avgLoad = doctors.length ? (patients.length / doctors.length).toFixed(1) : "0";

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-10 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Clinical Telemetry
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Executive Analytics Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time physician workload, diagnosis distributions, and patient intake volume.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outline" size="sm" className="text-xs font-semibold uppercase tracking-wider">
            <Link href="/doctor">Manage Doctors</Link>
          </Button>
          <Button asChild size="sm" className="text-xs font-semibold uppercase tracking-wider">
            <Link href="/patients">Inspect Patients</Link>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-card border border-border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Physicians</p>
            <h2 className="text-3xl font-bold text-foreground">{doctors.length}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-primary" /> Active staff
            </p>
          </div>
          <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-card border border-border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Patients</p>
            <h2 className="text-3xl font-bold text-foreground">{patients.length}</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-primary" /> Recorded intakes
            </p>
          </div>
          <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-card border border-border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avg Load / Doctor</p>
            <h2 className="text-3xl font-bold text-foreground">{avgLoad}</h2>
            <p className="text-xs text-muted-foreground">Patients per physician</p>
          </div>
          <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="p-6 bg-card border border-border flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Conditions</p>
            <h2 className="text-3xl font-bold text-foreground">{Object.keys(conditionCount).length}</h2>
            <p className="text-xs text-muted-foreground">Clinical diagnoses</p>
          </div>
          <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center text-foreground">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload by Doctor */}
        <div className="p-6 bg-card border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Patient Load by Physician</h2>
              <p className="text-xs text-muted-foreground">Caseload volume per active doctor</p>
            </div>
            <Link href="/doctor" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Directory <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="h-72 w-full pt-2">
            {patientsPerDoctorData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No doctor data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientsPerDoctorData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="name" stroke="currentColor" fontSize={11} tickLine={false} />
                  <YAxis stroke="currentColor" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: 0,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="patients" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Diagnosis Distribution */}
        <div className="p-6 bg-card border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Diagnosis Distribution</h2>
              <p className="text-xs text-muted-foreground">Breakdown of recorded patient conditions</p>
            </div>
            <Link href="/patients" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              Patients <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="h-72 w-full flex items-center justify-center pt-2">
            {conditionData.length === 0 ? (
              <p className="text-xs text-muted-foreground">No patient data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conditionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {conditionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: 0,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Intake Timeline */}
        <div className="p-6 bg-card border border-border lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Intake & Registration Timeline</h2>
              <p className="text-xs text-muted-foreground">Historical patient registration volume over time</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            {dateData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No timeline data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="date" stroke="currentColor" fontSize={11} tickLine={false} />
                  <YAxis stroke="currentColor" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: 0,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--primary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
