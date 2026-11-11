export interface DashboardStats {
  totalDoctors: number;
  totalPatients: number;
  patientsPerDoctor: Array<{
    doctorName: string;
    count: number;
  }>;
  dateBasedStats: Array<{
    date: string;
    count: number;
  }>;
}
