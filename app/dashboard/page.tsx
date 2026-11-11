import { Suspense } from "react";
import { getAllDoctors } from "@/services/getAllDoctor.service";
import { getAllPatients } from "@/services/getAllPatients.service";
import DashboardClient from "./DashboardClient";

export const instant = false;

async function DashboardData() {
  const [doctorsRes, patientsRes] = await Promise.all([
    getAllDoctors("limit=100"),
    getAllPatients("limit=100"),
  ]);

  return (
    <DashboardClient
      doctors={doctorsRes.data || []}
      patients={patientsRes.data || []}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-pulse">
          <div className="h-10 bg-[#EBE5DA] dark:bg-[#262320] w-72 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-[#EBE5DA] dark:bg-[#262320] rounded-2xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-72 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
            <div className="h-72 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
          </div>
        </div>
      }
    >
      <DashboardData />
    </Suspense>
  );
}
