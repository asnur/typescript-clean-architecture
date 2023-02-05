import { Status } from "../domain/entities/status";
import { StatusUseCase } from "../domain/interface/use-cases/status";
import { StatusRepository } from "../domain/interface/repository/status";
/**
 * @description Status use case implementation class that implements StatusUseCase interface
 * @class StatusUseCaseImpl
 * @implements  StatusUseCase
 */
export class StatusUseCaseImpl implements StatusUseCase {
  constructor(private statusRepository: StatusRepository) {
    this.statusRepository = statusRepository;
  }

  /**
   * @description Create Status
   * @param data Status
   * @returns  Promise<Status>
   */
  async create(data: Status): Promise<Status> {
    const status = await this.statusRepository.create(data);
    return status;
  }

  /**
   * @description Update Status
   * @param id string
   * @param data Status
   * @returns  Promise<Status>
   */
  async update(id: string, data: Status): Promise<Status> {
    const check_status = await this.findById(id);
    if (!check_status) {
      return Promise.reject("Status not found");
    }
    const status = await this.statusRepository.update(id, data);
    return status;
  }

  /**
   * @description Delete Status
   * @param id string
   * @returns  Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const status = await this.findById(id);
    if (!status) {
      return Promise.reject("Status not found");
    }
    return await this.statusRepository.delete(id);
  }

  /**
   * @description Find Status by id
   * @param id string
   * @returns Promise<Status>
   */
  async findById(id: string): Promise<Status> {
    const status = await this.statusRepository.findById(id);
    return status;
  }

  /**
   * @description Find all Status
   * @returns Promise<Status[]>
   */

  async findAll(): Promise<Status[]> {
    const status = await this.statusRepository.findAll();
    return status;
  }
}
