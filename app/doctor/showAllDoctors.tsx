"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, RotateCcw, Building2, Stethoscope, Mail, Phone, Plus, ArrowRight } from "lucide-react";
import { Doctor } from "@/types/doctor.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ShowAllDoctorsProps {
  doctors: Doctor[];
  meta?: Meta;
}

const COMMON_SPECIALIZATIONS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Surgery",
  "Internal Medicine",
  "Oncology",
];

export default function ShowAllDoctors({ doctors: serverDoctors = [], meta }: ShowAllDoctorsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Keep local doctors list in sync with server data during render
  const [prevServerDoctors, setPrevServerDoctors] = useState(serverDoctors);
  const [doctors, setDoctors] = useState<Doctor[]>(serverDoctors);

  if (serverDoctors !== prevServerDoctors) {
    setPrevServerDoctors(serverDoctors);
    setDoctors(serverDoctors);
  }

  // Local filter states initialized from URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialization, setSpecialization] = useState(searchParams.get("specialization") || "");
  const [hospital, setHospital] = useState(searchParams.get("hospital") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  // Sync inputs with URL params during render when searchParams change
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams.toString());
  const currentParamsString = searchParams.toString();
  if (currentParamsString !== prevSearchParams) {
    setPrevSearchParams(currentParamsString);
    setSearch(searchParams.get("search") || "");
    setSpecialization(searchParams.get("specialization") || "");
    setHospital(searchParams.get("hospital") || "");
    setStartDate(searchParams.get("startDate") || "");
    setEndDate(searchParams.get("endDate") || "");
  }

  // Update query params in URL
  const applyFilters = (newPage?: number) => {
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (specialization) params.set("specialization", specialization);
    if (hospital.trim()) params.set("hospital", hospital.trim());
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const page = newPage !== undefined ? newPage : 1;
    if (page > 1) params.set("page", String(page));

    startTransition(() => {
      router.push(`/doctor?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(1);
  };

  const handleReset = () => {
    setSearch("");
    setSpecialization("");
    setHospital("");
    setStartDate("");
    setEndDate("");
    startTransition(() => {
      router.push("/doctor");
    });
  };

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const totalCount = meta?.total !== undefined ? meta.total : doctors.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Clinical Registry
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Physician Directory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, and inspect verified medical staff profiles and active patient panels.
          </p>
        </div>

        <Button asChild className="gap-2 text-xs font-semibold uppercase tracking-wider">
          <Link href="/doctor/addDoctor">
            <Plus className="w-4 h-4" /> Add Doctor
          </Link>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-6 bg-card border border-border space-y-4">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by doctor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>

            {/* Specialization Filter */}
            <div className="relative">
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="flex h-10 w-full border border-input bg-background px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
              >
                <option value="" className="bg-card text-foreground">All Specializations</option>
                {COMMON_SPECIALIZATIONS.map((spec) => (
                  <option key={spec} value={spec} className="bg-card text-foreground">
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Hospital Filter */}
            <div>
              <Input
                type="text"
                placeholder="Filter by hospital..."
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="h-10 text-sm"
              />
            </div>

            {/* Date Range Start & End */}
            <div className="flex items-center gap-2">
              <Input
                type="date"
                title="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-1/2 h-10 text-xs"
              />
              <span className="text-xs text-muted-foreground">-</span>
              <Input
                type="date"
                title="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 h-10 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-border gap-4">
            <div className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{doctors.length}</span> of{" "}
              <span className="font-semibold text-foreground">{totalCount}</span> physicians
              {isPending && <span className="ml-2 italic text-primary">Filtering records...</span>}
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>

              <Button
                type="submit"
                size="sm"
                className="gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Filter className="w-3.5 h-3.5" />
                Apply Filters
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Doctors Grid */}
      {doctors.length === 0 ? (
        <div className="text-center py-20 border border-border bg-card p-8">
          <Stethoscope className="w-12 h-12 mx-auto text-muted-foreground opacity-40 mb-3" />
          <h2 className="text-xl font-bold text-foreground">
            No Physicians Found
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, hospital, or date parameters to locate matching staff.
          </p>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="mt-5 text-xs font-semibold uppercase tracking-wider"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="p-6 border border-border bg-card hover:border-foreground/40 transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-foreground tracking-tight">
                      {doctor.name}
                    </h2>
                    <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 bg-secondary text-secondary-foreground border border-border uppercase tracking-wider">
                      {doctor.specialization}
                    </span>
                  </div>

                  <div className="w-10 h-10 bg-secondary border border-border flex items-center justify-center text-foreground">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate text-foreground/80">{doctor.hospital}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground/80">{doctor.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate text-foreground/80">{doctor.email}</span>
                  </div>

                  {doctor.createdAt && (
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground pt-1">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>Registered: {new Date(doctor.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* View Assigned Patients */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/doctor/${doctor._id}/patients`}
                  className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1"
                >
                  View Patients <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[11px] font-mono text-muted-foreground">
                  ID: {doctor._id.slice(-6)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyFilters(currentPage - 1)}
              disabled={currentPage <= 1 || isPending}
              className="gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => applyFilters(currentPage + 1)}
              disabled={currentPage >= totalPages || isPending}
              className="gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
