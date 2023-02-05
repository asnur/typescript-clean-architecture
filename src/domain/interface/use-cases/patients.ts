import { Patients } from "../../entities/patients";

/**
 * @description PatientsUseCases interface for Patients use cases
 */
export interface PatientsUseCases {
  create(data: Patients): Promise<Patients>;
  update(id: string, data: Patients): Promise<Patients>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Patients>;
  findAll(): Promise<Patients[]>;
  searchByStatus(status: string): Promise<Patients[]>;
  searchByName(name: string): Promise<Patients[]>;
}
