"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const status_1 = require("./status");
const truncate_1 = require("../../utils/truncate");
/**
 * @description Patients Model Class for Patients Model
 * @class PatientsModelClass
 * @extends Model<Patients>
 */
class PatientsModelClass extends sequelize_1.Model {
}
/**
 * @description Patients Model for Patients Model
 * @param connection Sequelize
 * @returns typeof PatientsModelClass
 */
const PatientsModel = (connection) => {
    const Status = (0, status_1.StatusModel)(connection);
    PatientsModelClass.init({
        id: {
            type: sequelize_2.DataTypes.STRING,
            defaultValue: sequelize_2.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: sequelize_2.DataTypes.TEXT,
            allowNull: false,
        },
        id_status: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false,
            references: {
                model: Status,
                key: "id",
            },
        },
        in_date_at: {
            type: sequelize_2.DataTypes.DATE,
        },
        out_date_at: {
            type: sequelize_2.DataTypes.DATE,
        },
    }, {
        sequelize: connection,
        tableName: "patients",
        modelName: "patients",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    // Relations
    PatientsModelClass.hasOne(Status, {
        foreignKey: "id",
        sourceKey: "id_status",
    });
    // Sync Model
    PatientsModelClass.sync({ alter: false, force: false })
        .then(() => {
        console.log("Patients Model Synced");
    })
        .catch((error) => {
        console.log("Error syncing Patients table", error);
        (0, truncate_1.deleteAllTable)(connection);
    });
    // Remove Timestamps for response
    PatientsModelClass.removeAttribute("created_at");
    PatientsModelClass.removeAttribute("updated_at");
    return PatientsModelClass;
};
exports.PatientsModel = PatientsModel;
