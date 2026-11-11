import { Suspense } from "react";
import { getPatientsByDoctor } from "@/services/getPatientsByDoctor.service";
import { getDoctorById } from "@/services/getDoctorById.service";
import DoctorPatientsClient from "./DoctorPatientsClient";

export const instant = false;

interface DoctorPatientsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function DoctorPatientsData({ id }: { id: string }) {
  const [doctor, patientsRes] = await Promise.all([
    getDoctorById(id),
    getPatientsByDoctor(id, "limit=100"),
  ]);

  const patients = patientsRes?.data || [];

  return (
    <DoctorPatientsClient
      doctor={doctor}
      doctorId={id}
      initialPatients={patients}
    />
  );
}

export default async function DoctorPatientsPage({
  params,
}: DoctorPatientsPageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-pulse font-sans">
          <div className="h-4 bg-[#EBE5DA] dark:bg-[#262320] w-36 rounded-md" />
          <div className="h-44 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
          <div className="h-96 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
        </div>
      }
    >
      <DoctorPatientsData id={id} />
    </Suspense>
  );
}
