"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  Loader2,
  X,
  Check,
} from "lucide-react";
import { Patient } from "@/types/patient.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PatientClientProps {
  patients: Patient[];
  meta?: Meta;
}

const COMMON_CONDITIONS = [
  "Stable",
  "Cardiology Follow-up",
  "Post-operative",
  "Critical Care",
  "Chronic Monitoring",
  "Routine Checkup",
];

export default function PatientClient({ patients: serverPatients, meta }: PatientClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Keep local patient list in sync with server data during render
  const [prevServerPatients, setPrevServerPatients] = useState(serverPatients);
  const [patients, setPatients] = useState<Patient[]>(serverPatients);

  if (serverPatients !== prevServerPatients) {
    setPrevServerPatients(serverPatients);
    setPatients(serverPatients);
  }

  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

  // Filter state - initialized from current URL params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  // Sync inputs with URL params during render when searchParams change
  const [prevSearchParams, setPrevSearchParams] = useState(searchParams.toString());
  const currentParamsString = searchParams.toString();
  if (currentParamsString !== prevSearchParams) {
    setPrevSearchParams(currentParamsString);
    setSearch(searchParams.get("search") || "");
    setCondition(searchParams.get("condition") || "");
    setStartDate(searchParams.get("startDate") || "");
    setEndDate(searchParams.get("endDate") || "");
  }

  // Edit modal state
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState<number | "">("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editCondition, setEditCondition] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState(false);

  // ─── Filter handlers ────────────────────────────────────────
  const buildParams = (page: number) => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (condition) params.set("condition", condition);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (page > 1) params.set("page", String(page));
    return params;
  };

  const applyFilters = (page = 1) => {
    startTransition(() => {
      router.push(`/patients?${buildParams(page).toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(1);
  };

  const handleReset = () => {
    setSearch("");
    setCondition("");
    setStartDate("");
    setEndDate("");
    startTransition(() => {
      router.push("/patients");
    });
  };

  // ─── Delete handler ─────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this patient record?")) return;
    setLoadingDeleteId(id);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete patient");
      }
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error deleting patient";
      alert(errorMsg);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  // ─── Edit modal handlers ────────────────────────────────────
  const openEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setEditName(patient.name);
    setEditAge(patient.age);
    setEditPhone(patient.phone);
    setEditAddress(patient.address);
    setEditCondition(patient.condition);
    setEditError("");
    setEditSuccess(false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatient) return;
    setIsSavingEdit(true);
    setEditError("");
    setEditSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/${editingPatient._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editName.trim(),
            age: Number(editAge),
            phone: editPhone.trim(),
            address: editAddress.trim(),
            condition: editCondition,
          }),
        }
      );
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.message || "Failed to update patient");

      const updated: Patient = result.data || {
        ...editingPatient,
        name: editName.trim(),
        age: Number(editAge),
        phone: editPhone.trim(),
        address: editAddress.trim(),
        condition: editCondition,
        updatedAt: new Date().toISOString(),
      };

      setPatients((prev) =>
        prev.map((p) => (p._id === editingPatient._id ? updated : p))
      );
      setEditSuccess(true);
      setTimeout(() => setEditingPatient(null), 600);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update patient";
      setEditError(errorMsg);
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ─── Pagination ─────────────────────────────────────────────
  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.totalPages ?? 1;
  const totalCount = meta?.total ?? patients.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-6 py-10 w-full">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Central Records
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Patient Registry
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, filter, update medical profiles, and monitor patient clinical telemetry.
          </p>
        </div>
        <div className="text-xs px-4 py-2 border border-border bg-card text-muted-foreground whitespace-nowrap">
          Total Records:{" "}
          <span className="font-bold text-foreground font-mono">
            {totalCount}
          </span>
        </div>
      </div>

      {/* ── Filter Panel ── */}
      <div className="p-6 bg-card border border-border">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by patient name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>

            {/* Condition */}
            <div>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="flex h-10 w-full border border-input bg-background px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
              >
                <option value="" className="bg-card text-foreground">All Conditions</option>
                {COMMON_CONDITIONS.map((c) => (
                  <option key={c} value={c} className="bg-card text-foreground">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <Input
                type="date"
                title="From date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-1/2 h-10 text-xs"
              />
              <span className="text-xs text-muted-foreground">–</span>
              <Input
                type="date"
                title="To date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 h-10 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-border gap-4">
            <span className="text-xs text-muted-foreground">
              {isPending ? (
                <span className="italic text-primary">Filtering patient database...</span>
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {patients.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {totalCount}
                  </span>{" "}
                  records
                </>
              )}
            </span>
            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Filter className="w-3.5 h-3.5" /> Apply Filters
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ── Table ── */}
      <div className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-5">Age</th>
                <th className="py-3.5 px-5">Phone</th>
                <th className="py-3.5 px-5">Address</th>
                <th className="py-3.5 px-5">Condition</th>
                <th className="py-3.5 px-5">Doctor ID</th>
                <th className="py-3.5 px-5">Registered</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-muted-foreground">
                    <p className="text-base font-semibold text-foreground mb-1">
                      No patients found
                    </p>
                    <p className="text-xs">
                      Try adjusting your search criteria or clearing filters.
                    </p>
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-5 font-semibold text-foreground">
                      {patient.name}
                    </td>
                    <td className="py-4 px-5 text-muted-foreground">
                      {patient.age} yrs
                    </td>
                    <td className="py-4 px-5 text-muted-foreground font-mono text-xs">
                      {patient.phone}
                    </td>
                    <td className="py-4 px-5 text-muted-foreground max-w-[160px] truncate">
                      {patient.address}
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
                        {patient.condition}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-xs font-mono text-muted-foreground">
                      {patient.doctorId ? String(patient.doctorId).slice(-6) : "—"}
                    </td>
                    <td className="py-4 px-5 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(patient)}
                          title="Edit patient"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(patient._id)}
                          disabled={loadingDeleteId === patient._id}
                          title="Delete patient"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          {loadingDeleteId === patient._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Page{" "}
            <span className="font-semibold text-foreground">{currentPage}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyFilters(currentPage - 1)}
              disabled={currentPage <= 1 || isPending}
              className="gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyFilters(currentPage + 1)}
              disabled={currentPage >= totalPages || isPending}
              className="gap-1 text-xs font-semibold uppercase tracking-wider"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Edit Patient Modal ── */}
      {editingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Edit Patient Record
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  ID: {editingPatient._id}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setEditingPatient(null)}
                className="text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {editError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                {editError}
              </div>
            )}
            {editSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" /> Patient updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              {/* Age + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    required
                    min={1}
                    max={130}
                    value={editAge}
                    onChange={(e) =>
                      setEditAge(e.target.value ? Number(e.target.value) : "")
                    }
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  type="text"
                  required
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              {/* Condition */}
              <div className="space-y-1.5">
                <Label htmlFor="edit-condition">Condition / Diagnosis</Label>
                <select
                  id="edit-condition"
                  value={editCondition}
                  onChange={(e) => setEditCondition(e.target.value)}
                  className="flex h-10 w-full border border-input bg-background px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
                >
                  {COMMON_CONDITIONS.map((c) => (
                    <option key={c} value={c} className="bg-card text-foreground">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Footer buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingPatient(null)}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSavingEdit}
                  className="gap-2 px-6 text-xs font-semibold uppercase tracking-wider"
                >
                  {isSavingEdit && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSavingEdit ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
