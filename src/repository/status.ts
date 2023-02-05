import { StatusRepository } from "../domain/interface/repository/status";
import { Status } from "../domain/entities/status";
import { StatusModel } from "../domain/model/status";
import { Sequelize } from "sequelize";

/**
 * @description Status Repository Implementation Class for Status Repository
 * @class StatusRepositoryImpl
 * @constructor StatusRepositoryImpl(connection: Sequelize)
 * @implements StatusRepository
 */
export class StatusRepositoryImpl implements StatusRepository {
  private StatusModels: any;

  constructor(connection: Sequelize) {
    this.StatusModels = StatusModel(connection);
  }

  /**
   * @description Create status and return status
   * @param data Status
   * @returns Promise<Status>
   */
  async create(data: Status): Promise<Status> {
    const status = await this.StatusModels.create(data);
    return this.findById(status.id);
  }

  /**
   * @description Update status by id and return status
   * @param id number
   * @param data Status
   * @returns Promise<Status>
   */
  async update(id: string, data: Status): Promise<Status> {
    const status = await this.StatusModels.update(data, {
      where: { id },
    });

    if (!status) {
      return Promise.reject("Status not found");
    }

    return this.findById(id);
  }

  /**
   * @description Delete status by id and return boolean
   * @param id number
   * @returns Promise<boolean>
   */
  async delete(id: string): Promise<boolean> {
    const status = await this.StatusModels.destroy({
      where: { id },
    });

    if (!status) {
      return Promise.reject("Status not found");
    }

    return true;
  }

  /**
   * @description Find status by id
   * @param id number
   * @returns Promise<Status>
   */
  async findById(id: string): Promise<Status> {
    const status = await this.StatusModels.findByPk(id);
    if (!status) {
      return Promise.reject("Status not found");
    }

    return status;
  }

  /**
   * @description Find all status
   * @returns Promise<Status[]>
   */

  async findAll(): Promise<Status[]> {
    const status = await this.StatusModels.findAll();
    return status;
  }
}
