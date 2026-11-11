export interface Patient {
  _id: string;
  name: string;
  age: number;
  phone: string;
  address: string;
  condition: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientPayload {
  name: string;
  age: number;
  phone: string;
  address: string;
  condition: string;
  doctorId: string;
}

export interface UpdatePatientPayload {
  name?: string;
  age?: number;
  phone?: string;
  address?: string;
  condition?: string;
  doctorId?: string;
}

export interface PatientQuery {
  page?: string;
  limit?: string;
  search?: string;
  condition?: string;
  doctorId?: string;
  startDate?: string;
  endDate?: string;
}
