export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface CreateDoctorPayload {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}
