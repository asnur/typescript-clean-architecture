import { Status } from "../../entities/status";

/**
 * @description StatusRepository interface for Status repository
 */
export interface StatusRepository {
  create(data: Status): Promise<Status>;
  update(id: string, data: Status): Promise<Status>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Status>;
  findAll(): Promise<Status[]>;
}
