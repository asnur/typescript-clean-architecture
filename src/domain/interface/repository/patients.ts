import { Patients } from "../../entities/patients";

/**
 * @description PatientsRepository interface for Patients repository
 */
export interface PatientsRepository {
  create(data: Patients): Promise<Patients>;
  update(id: string, data: Patients): Promise<Patients>;
  delete(id: string): Promise<boolean>;
  find(data: Patients): Promise<Patients[]>;
  findById(id: string): Promise<Patients>;
}
