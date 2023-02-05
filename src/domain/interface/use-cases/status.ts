import { Status } from "../../entities/status";

/**
 * @description StatusUseCase interface for Status use case
 */
export interface StatusUseCase {
  create(data: Status): Promise<Status>;
  update(id: string, data: Status): Promise<Status>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Status>;
  findAll(): Promise<Status[]>;
}
