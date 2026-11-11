import { Suspense } from "react";
import { getAllPatients } from "@/services/getAllPatients.service";
import PatientClient from "./PatientClient";

export const instant = false;

interface PatientsPageProps {
  searchParams: Promise<{
    search?: string;
    condition?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
  }>;
}

async function PatientsData({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    condition?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;

  const queryParts: string[] = [];
  if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
  if (params.condition) queryParts.push(`condition=${encodeURIComponent(params.condition)}`);
  if (params.startDate) queryParts.push(`startDate=${encodeURIComponent(params.startDate)}`);
  if (params.endDate) queryParts.push(`endDate=${encodeURIComponent(params.endDate)}`);
  queryParts.push(`page=${encodeURIComponent(params.page || "1")}`);
  queryParts.push(`limit=${encodeURIComponent(params.limit || "10")}`);

  const queryString = queryParts.join("&");
  const result = await getAllPatients(queryString);

  return (
    <PatientClient
      patients={result?.data || []}
      meta={result?.meta}
    />
  );
}

export default function PatientsPage({ searchParams }: PatientsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Suspense
        fallback={
          <div className="space-y-6 animate-pulse font-sans">
            <div className="h-10 bg-[#EBE5DA] dark:bg-[#262320] w-64 rounded-2xl" />
            <div className="h-24 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
            <div className="h-96 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
          </div>
        }
      >
        <PatientsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
