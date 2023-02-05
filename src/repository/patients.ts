import { PatientsRepository } from "../domain/interface/repository/patients";
import { Patients } from "../domain/entities/patients";
import { PatientsModel } from "../domain/model/patients";
import { StatusModel } from "../domain/model/status";
import { Sequelize } from "sequelize";

/**
 * @description Patients Repository Implementation Class for Patients Repository
 * @class PatientsRepositoryImpl
 * @implements PatientsRepository
 * @constructor PatientsRepositoryImpl(connection: Sequelize)
 */
export class PatientsRepositoryImpl implements PatientsRepository {
  private PatientsModels: any;
  private StatusModel: any;

  constructor(connection: Sequelize) {
    this.PatientsModels = PatientsModel(connection);
    this.StatusModel = StatusModel(connection);
  }

  /**
   * @description Create patients and return patients with status
   * @param data Patients
   * @returns Promise<Patients>
   */
  async create(data: Patients): Promise<Patients> {
    const created_patients = await this.PatientsModels.create(data);
    const patient = await this.findById(created_patients.id);
    return patient;
  }

  /**
   * @description Update patients by id and return patients with status
   * @param id string
   * @param data Patients
   * @returns Promise<Patients>
   */
  async update(id: string, data: Patients): Promise<Patients> {
    const updated_patients = await this.PatientsModels.update(data, {
      where: { id },
    });

    // Check if patients is not found or not updated
    if (!updated_patients) {
      return Promise.reject("Patients not found");
    }

    const patient = await this.findById(id);
    return patient;
  }

  /**
   * @description Find all patients with status
   * @returns Promise<Patients[]>
   */
  async find(data: Patients): Promise<Patients[]> {
    const patients = await this.PatientsModels.findAll({
      where: data,
      include: [
        {
          model: this.StatusModel,
        },
      ],
    });
    return patients;
  }

  /**
   * @description Find patients by id with status
   * @param id string
   * @returns Promise<Patients>
   */
  async findById(id: string): Promise<Patients> {
    const patients = await this.PatientsModels.findByPk(id, {
      include: [
        {
          model: this.StatusModel,
        },
      ],
    });
    return patients;
  }

  /**
   * @description Delete patients by id
   * @param id string
   * @returns Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    // Check if patients is not found
    const patients = await this.PatientsModels.findByPk(id);
    if (!patients) {
      return Promise.reject("Patients not found");
    }

    // Delete patients
    await patients.destroy();

    return Promise.resolve(true);
  }
}
