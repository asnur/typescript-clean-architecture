import { Patients } from "../domain/entities/patients";
import { PatientsRepository } from "../domain/interface/repository/patients";
import { PatientsUseCases } from "../domain/interface/use-cases/patients";
import { StatusRepository } from "../domain/interface/repository/status";
import { Op } from "sequelize";

/**
 * @description PatientsUseCasesImpl class implements PatientsUseCases interface
 * @class PatientsUseCasesImpl
 * @constructor PatientsUseCasesImpl(patientsRepository: PatientsRepository)
 * @implements  PatientsUseCases
 */
export class PatientsUseCasesImpl implements PatientsUseCases {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly statusRepository: StatusRepository
  ) {
    this.patientsRepository = patientsRepository;
    this.statusRepository = statusRepository;
  }

  /**
   * @description Create Patients
   * @param data Patients
   * @returns  Promise<Patients>
   */
  async create(data: Patients): Promise<Patients> {
    // Validate Status is exist or not
    const status = await this.statusRepository.findById(String(data.id_status));
    if (!status) {
      return Promise.reject("Status not found");
    }

    return await this.patientsRepository.create(data);
  }

  /**
   * @description Update Patients
   * @param id string
   * @param data Patients
   * @returns  Promise<Patients>
   */
  async update(id: string, data: Patients): Promise<Patients> {
    // Validate Status is exist or not
    if (data.id_status) {
      const status = await this.statusRepository.findById(
        String(data.id_status)
      );
      if (!status) {
        return Promise.reject("Status not found");
      }
    }

    const patients = await this.findById(id);
    if (!patients) {
      return Promise.reject("Patients not found");
    }

    return await this.patientsRepository.update(id, data);
  }

  /**
   * @description Delete Patients
   * @param id string
   * @returns  Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const patients = await this.findById(id);

    if (!patients) {
      return Promise.reject("Patients not found");
    }

    return await this.patientsRepository.delete(id);
  }

  /**
   * @description Find Patients by id
   * @param id string
   * @returns  Promise<Patients>
   */
  async findById(id: string): Promise<Patients> {
    const patient = await this.patientsRepository.findById(id);
    if (!patient) {
      return Promise.reject("Patients not found");
    }

    return patient;
  }

  /**
   * @description Find all Patients
   * @returns Promise<Patients[]>
   */
  async findAll(): Promise<Patients[]> {
    return await this.patientsRepository.find(<Patients>{});
  }

  /**
   * @description Search Patients by status
   * @param status  string
   * @returns Promise<Patients[]>
   */
  async searchByStatus(status: string): Promise<Patients[]> {
    const patients = await this.patientsRepository.find(<Patients>{
      "$status.name$": status,
    });
    return patients;
  }

  /**
   * @description Search Patients by name
   * @param name string
   * @returns Promise<Patients[]>
   */
  async searchByName(name: string): Promise<Patients[]> {
    const patients = await this.patientsRepository.find(<Patients>{
      "$patients.name$": {
        [Op.like]: `%${name}%`,
      },
    });
    return patients;
  }
}
