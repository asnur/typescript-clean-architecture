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
exports.PatientsRepositoryImpl = void 0;
const patients_1 = require("../domain/model/patients");
const status_1 = require("../domain/model/status");
/**
 * @description Patients Repository Implementation Class for Patients Repository
 * @class PatientsRepositoryImpl
 * @implements PatientsRepository
 * @constructor PatientsRepositoryImpl(connection: Sequelize)
 */
class PatientsRepositoryImpl {
    constructor(connection) {
        this.PatientsModels = (0, patients_1.PatientsModel)(connection);
        this.StatusModel = (0, status_1.StatusModel)(connection);
    }
    /**
     * @description Create patients and return patients with status
     * @param data Patients
     * @returns Promise<Patients>
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created_patients = yield this.PatientsModels.create(data);
            const patient = yield this.findById(created_patients.id);
            return patient;
        });
    }
    /**
     * @description Update patients by id and return patients with status
     * @param id string
     * @param data Patients
     * @returns Promise<Patients>
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated_patients = yield this.PatientsModels.update(data, {
                where: { id },
            });
            // Check if patients is not found or not updated
            if (!updated_patients) {
                return Promise.reject("Patients not found");
            }
            const patient = yield this.findById(id);
            return patient;
        });
    }
    /**
     * @description Find all patients with status
     * @returns Promise<Patients[]>
     */
    find(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield this.PatientsModels.findAll({
                where: data,
                include: [
                    {
                        model: this.StatusModel,
                    },
                ],
            });
            return patients;
        });
    }
    /**
     * @description Find patients by id with status
     * @param id string
     * @returns Promise<Patients>
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patients = yield this.PatientsModels.findByPk(id, {
                include: [
                    {
                        model: this.StatusModel,
                    },
                ],
            });
            return patients;
        });
    }
    /**
     * @description Delete patients by id
     * @param id string
     * @returns Promise<boolean>
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if patients is not found
            const patients = yield this.PatientsModels.findByPk(id);
            if (!patients) {
                return Promise.reject("Patients not found");
            }
            // Delete patients
            yield patients.destroy();
            return Promise.resolve(true);
        });
    }
}
exports.PatientsRepositoryImpl = PatientsRepositoryImpl;
