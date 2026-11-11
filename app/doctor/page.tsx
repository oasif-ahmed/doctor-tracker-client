import { Suspense } from "react";
import { getAllDoctors } from "@/services/getAllDoctor.service";
import ShowAllDoctors from "./showAllDoctors";

export const instant = false;

interface DoctorPageProps {
  searchParams: Promise<{
    search?: string;
    specialization?: string;
    hospital?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
  }>;
}

async function DoctorDirectoryData({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    specialization?: string;
    hospital?: string;
    startDate?: string;
    endDate?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  const params = await searchParams;

  const queryParts: string[] = [];
  if (params.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
  if (params.specialization) queryParts.push(`specialization=${encodeURIComponent(params.specialization)}`);
  if (params.hospital) queryParts.push(`hospital=${encodeURIComponent(params.hospital)}`);
  if (params.startDate) queryParts.push(`startDate=${encodeURIComponent(params.startDate)}`);
  if (params.endDate) queryParts.push(`endDate=${encodeURIComponent(params.endDate)}`);
  queryParts.push(`page=${encodeURIComponent(params.page || "1")}`);
  queryParts.push(`limit=${encodeURIComponent(params.limit || "9")}`);

  const queryString = queryParts.join("&");
  const doctor = await getAllDoctors(queryString);

  return (
    <ShowAllDoctors
      doctors={doctor?.data || []}
      meta={doctor?.meta}
    />
  );
}

export default function DoctorPage({ searchParams }: DoctorPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Suspense
        fallback={
          <div className="space-y-8 animate-pulse">
            <div className="h-10 bg-[#EBE5DA] dark:bg-[#262320] w-64 rounded-2xl" />
            <div className="h-28 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-[#EBE5DA] dark:bg-[#262320] rounded-3xl" />
              ))}
            </div>
          </div>
        }
      >
        <DoctorDirectoryData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
