"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_1 = require("sequelize");
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT } = require("dotenv").config().parsed;
exports.connection = new sequelize_1.Sequelize({
    /**
     * @description Database connection
     * if using docker container use host: "database" ~ database is the name of the service in docker-compose.yml
     * if using local machine use host: "localhost" or "127.0.0.1"
     * @param host string
     * @param dialect string
     * @param dialectModule any
     * @param port number
     * @param logging boolean
     */
    host: DB_HOST || "database",
    username: DB_USERNAME || "user",
    password: DB_PASSWORD,
    database: DB_NAME || "final_project",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    port: Number(DB_PORT) || 3306,
    logging: false,
});
