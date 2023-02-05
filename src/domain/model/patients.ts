import { Model } from "sequelize";
import { Patients } from "../entities/patients";
import { Sequelize, DataTypes } from "sequelize";
import { StatusModel } from "./status";
import { deleteAllTable } from "../../utils/truncate";

/**
 * @description Patients Model Class for Patients Model
 * @class PatientsModelClass
 * @extends Model<Patients>
 */
class PatientsModelClass extends Model<Patients> {
  declare id: string;
  declare name: string;
  declare phone: string;
  declare address: string;
  declare id_status: number;
  declare in_date_at: Date;
  declare out_date_at: Date;
  declare created_at: Date;
  declare updated_at: Date;
}

/**
 * @description Patients Model for Patients Model
 * @param connection Sequelize
 * @returns typeof PatientsModelClass
 */
const PatientsModel = (connection: Sequelize): typeof PatientsModelClass => {
  const Status: any = StatusModel(connection);
  PatientsModelClass.init(
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_status: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Status,
          key: "id",
        },
      },
      in_date_at: {
        type: DataTypes.DATE,
      },
      out_date_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: connection,
      tableName: "patients",
      modelName: "patients",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

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
      deleteAllTable(connection);
    });

  // Remove Timestamps for response
  PatientsModelClass.removeAttribute("created_at");
  PatientsModelClass.removeAttribute("updated_at");

  return PatientsModelClass;
};

export { PatientsModel };
