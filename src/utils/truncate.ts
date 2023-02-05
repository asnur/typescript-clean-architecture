import { Sequelize } from "sequelize";

/**
 *@@description Delete All Table in Database
 */
export const deleteAllTable = async (connection: Sequelize) => {
  const query = `SET FOREIGN_KEY_CHECKS = 0; 
    DROP TABLE IF EXISTS users, status, patients;
    SET FOREIGN_KEY_CHECKS = 1;`;
  await connection.query(query);
};
