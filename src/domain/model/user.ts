import { Model, Sequelize, DataTypes } from "sequelize";
import { User } from "../entities/user";
import { deleteAllTable } from "../../utils/truncate";

/**
 * @description User Model Class for User Model
 * @class UserModelClass
 * @extends Model<User>
 */
class UserModelClass extends Model<User> {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare created_at: Date;
  declare updated_at: Date;
}

/**
 * @description UserModel for User Model
 * @param connection Sequelize
 * @returns typeof UserModelClass
 */
const UserModel = (connection: Sequelize): typeof UserModelClass => {
  UserModelClass.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: "users",
      timestamps: true,
      modelName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Sync model
  UserModelClass.sync({ alter: false, force: false })
    .then(() => {
      console.log("Patients Model Synced");
    })
    .catch((error) => {
      console.log("Error syncing Status table", error);
      deleteAllTable(connection);
    });

  // Remove timestamps for response
  UserModelClass.removeAttribute("created_at");
  UserModelClass.removeAttribute("updated_at");

  return UserModelClass;
};

export { UserModel };
