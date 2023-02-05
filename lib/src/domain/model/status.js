"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusModel = void 0;
const sequelize_1 = require("sequelize");
const truncate_1 = require("../../utils/truncate");
/**
 * @description Status Model Class for Status Model
 * @class StatusModelClass
 * @extends Model<Status>
 */
class StatusModelClass extends sequelize_1.Model {
}
/**
 * @description StatusModel for Status Model
 * @param connection Sequelize
 * @returns typeof StatusModelClass
 */
const StatusModel = (connection) => {
    StatusModelClass.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize: connection,
        tableName: "status",
        timestamps: true,
        modelName: "status",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    // Sync model
    StatusModelClass.sync({ alter: false, force: false })
        .then(() => {
        console.log("Status table synced");
    })
        .catch((error) => {
        console.log("Error syncing Status table", error);
        (0, truncate_1.deleteAllTable)(connection);
    });
    // Remove timestamps for response
    StatusModelClass.removeAttribute("created_at");
    StatusModelClass.removeAttribute("updated_at");
    return StatusModelClass;
};
exports.StatusModel = StatusModel;
