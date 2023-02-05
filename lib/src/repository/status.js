"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusRepositoryImpl = void 0;
const status_1 = require("../domain/model/status");
/**
 * @description Status Repository Implementation Class for Status Repository
 * @class StatusRepositoryImpl
 * @constructor StatusRepositoryImpl(connection: Sequelize)
 * @implements StatusRepository
 */
class StatusRepositoryImpl {
    constructor(connection) {
        this.StatusModels = (0, status_1.StatusModel)(connection);
    }
    /**
     * @description Create status and return status
     * @param data Status
     * @returns Promise<Status>
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.StatusModels.create(data);
            return this.findById(status.id);
        });
    }
    /**
     * @description Update status by id and return status
     * @param id number
     * @param data Status
     * @returns Promise<Status>
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.StatusModels.update(data, {
                where: { id },
            });
            if (!status) {
                return Promise.reject("Status not found");
            }
            return this.findById(id);
        });
    }
    /**
     * @description Delete status by id and return boolean
     * @param id number
     * @returns Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.StatusModels.destroy({
                where: { id },
            });
            if (!status) {
                return Promise.reject("Status not found");
            }
            return true;
        });
    }
    /**
     * @description Find status by id
     * @param id number
     * @returns Promise<Status>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.StatusModels.findByPk(id);
            if (!status) {
                return Promise.reject("Status not found");
            }
            return status;
        });
    }
    /**
     * @description Find all status
     * @returns Promise<Status[]>
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.StatusModels.findAll();
            return status;
        });
    }
}
exports.StatusRepositoryImpl = StatusRepositoryImpl;
