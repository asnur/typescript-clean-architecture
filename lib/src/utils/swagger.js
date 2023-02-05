"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerJson = exports.swagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API for Patient Covid-19",
            version: package_json_1.version,
            description: "This is a REST API application made with Express and documented with Swagger for Patient Covid-19 and it's data is stored in a Mysql database.",
            contact: {
                name: "Muhammad Asnur Ramdani",
                email: "asnurramdhani12@gmail.com",
                url: "https://www.linkedin.com/in/asnurramdani/",
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        "./src/delivery/controller/*.ts",
        "./src/delivery/controller/*.js",
        "./src/domain/entities/*.ts",
        "./src/domain/entities/*.js",
    ], // files containing annotations as above,
};
const specs = (0, swagger_jsdoc_1.default)(options);
const swagger = (app) => {
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.swagger = swagger;
// export and download the swagger.json file for postman
const swaggerJson = (app) => {
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
    });
};
exports.swaggerJson = swaggerJson;
