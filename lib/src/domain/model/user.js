"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const truncate_1 = require("../../utils/truncate");
/**
 * @description User Model Class for User Model
 * @class UserModelClass
 * @extends Model<User>
 */
class UserModelClass extends sequelize_1.Model {
}
/**
 * @description UserModel for User Model
 * @param connection Sequelize
 * @returns typeof UserModelClass
 */
const UserModel = (connection) => {
    UserModelClass.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize: connection,
        tableName: "users",
        timestamps: true,
        modelName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    // Sync model
    UserModelClass.sync({ alter: false, force: false })
        .then(() => {
        console.log("Patients Model Synced");
    })
        .catch((error) => {
        console.log("Error syncing Status table", error);
        (0, truncate_1.deleteAllTable)(connection);
    });
    // Remove timestamps for response
    UserModelClass.removeAttribute("created_at");
    UserModelClass.removeAttribute("updated_at");
    return UserModelClass;
};
exports.UserModel = UserModel;
