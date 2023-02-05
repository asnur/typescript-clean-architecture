import { Model, Sequelize, DataTypes } from "sequelize";
import { Status } from "../entities/status";
import { deleteAllTable } from "../../utils/truncate";

/**
 * @description Status Model Class for Status Model
 * @class StatusModelClass
 * @extends Model<Status>
 */
class StatusModelClass extends Model<Status> {
  declare id: number;
  declare name: string;
  declare created_at: Date;
  declare updated_at: Date;
}

/**
 * @description StatusModel for Status Model
 * @param connection Sequelize
 * @returns typeof StatusModelClass
 */
const StatusModel = (connection: Sequelize): typeof StatusModelClass => {
  StatusModelClass.init(
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
    },
    {
      sequelize: connection,
      tableName: "status",
      timestamps: true,
      modelName: "status",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Sync model
  StatusModelClass.sync({ alter: false, force: false })
    .then(() => {
      console.log("Status table synced");
    })
    .catch((error) => {
      console.log("Error syncing Status table", error);
      deleteAllTable(connection);
    });

  // Remove timestamps for response
  StatusModelClass.removeAttribute("created_at");
  StatusModelClass.removeAttribute("updated_at");

  return StatusModelClass;
};

export { StatusModel };
