"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus, Trash2, Loader2, Stethoscope, Mail, Phone, Building2, X, Plus } from "lucide-react";
import { Doctor } from "@/types/doctor.types";
import { Patient } from "@/types/patient.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DoctorPatientsClientProps {
  doctor: Doctor | null;
  doctorId: string;
  initialPatients: Patient[];
}

export default function DoctorPatientsClient({
  doctor,
  doctorId,
  initialPatients,
}: DoctorPatientsClientProps) {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // New Patient Form State
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [condition, setCondition] = useState("Stable");

  // Handle Delete Patient from this doctor's list
  const handleDeletePatient = async (patientId: string) => {
    if (!confirm("Are you sure you want to remove this patient from the doctor's directory?")) {
      return;
    }

    setLoadingDeleteId(patientId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/${patientId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      setPatients((prev) => prev.filter((p) => p._id !== patientId));
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error deleting patient";
      alert(errorMsg);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  // Handle Add Patient under this doctor
  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://doctor-tracker-server-zeta.vercel.app"}/api/patient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            age: Number(age),
            phone,
            address,
            condition,
            doctorId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add patient");
      }

      if (result.data) {
        setPatients((prev) => [result.data, ...prev]);
      }

      setName("");
      setAge("");
      setPhone("");
      setAddress("");
      setCondition("Stable");
      setIsModalOpen(false);
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to add patient";
      setFormError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 w-full">
      {/* Back button */}
      <div>
        <Link
          href="/doctor"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors Directory
        </Link>
      </div>

      {/* Doctor Summary Header Card */}
      <div className="p-8 bg-card border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider border border-border">
            <Stethoscope className="w-3.5 h-3.5 text-primary" /> Assigned Physician
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {doctor ? doctor.name : `Doctor ID: ${doctorId}`}
          </h1>
          {doctor && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground uppercase tracking-wider">
                {doctor.specialization}
              </span>
              <span className="flex items-center gap-1.5 text-foreground/80">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                {doctor.hospital}
              </span>
              <span className="flex items-center gap-1.5 text-foreground/80">
                <Phone className="w-3.5 h-3.5 text-primary" />
                {doctor.phone}
              </span>
              <span className="flex items-center gap-1.5 text-foreground/80">
                <Mail className="w-3.5 h-3.5 text-primary" />
                {doctor.email}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
        >
          <UserPlus className="w-4 h-4" />
          Add Patient to Doctor
        </Button>
      </div>

      {/* Patients List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Assigned Clinical Cases ({patients.length})
          </h2>
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Active Caseload
          </span>
        </div>

        <div className="border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-5">Patient Name</th>
                  <th className="py-3.5 px-5">Age</th>
                  <th className="py-3.5 px-5">Phone</th>
                  <th className="py-3.5 px-5">Address</th>
                  <th className="py-3.5 px-5">Condition</th>
                  <th className="py-3.5 px-5">Registered Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-muted-foreground">
                      <p className="text-base font-semibold text-foreground mb-1">
                        No patients assigned yet
                      </p>
                      <p className="text-xs">
                        Click &quot;Add Patient to Doctor&quot; to assign clinical cases to this physician.
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
                      <td className="py-4 px-5 text-muted-foreground max-w-xs truncate">
                        {patient.address}
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
                          {patient.condition}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeletePatient(patient._id)}
                          disabled={loadingDeleteId === patient._id}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Remove Patient"
                        >
                          {loadingDeleteId === patient._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Patient Under Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Add Patient Under Doctor
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Assigning case to {doctor ? doctor.name : `Doctor ${doctorId}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {formError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="add-name">Patient Full Name</Label>
                <Input
                  id="add-name"
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="add-age">Age</Label>
                  <Input
                    id="add-age"
                    type="number"
                    required
                    min={1}
                    max={130}
                    placeholder="42"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    className="h-10 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="add-phone">Phone Number</Label>
                  <Input
                    id="add-phone"
                    type="text"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="add-address">Address</Label>
                <Input
                  id="add-address"
                  type="text"
                  required
                  placeholder="123 Health Ave, Suite 4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="add-condition">Condition / Diagnosis</Label>
                <select
                  id="add-condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="flex h-10 w-full border border-input bg-background px-3 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-1"
                >
                  <option value="Stable" className="bg-card text-foreground">Stable</option>
                  <option value="Cardiology Follow-up" className="bg-card text-foreground">Cardiology Follow-up</option>
                  <option value="Post-operative" className="bg-card text-foreground">Post-operative</option>
                  <option value="Critical Care" className="bg-card text-foreground">Critical Care</option>
                  <option value="Chronic Monitoring" className="bg-card text-foreground">Chronic Monitoring</option>
                  <option value="Routine Checkup" className="bg-card text-foreground">Routine Checkup</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 px-6 text-xs font-semibold uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Adding..." : "Assign Patient"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
