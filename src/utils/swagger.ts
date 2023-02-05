import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API for Patient Covid-19",
      version: version,
      description:
        "This is a REST API application made with Express and documented with Swagger for Patient Covid-19 and it's data is stored in a Mysql database.",
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

const specs = swaggerJsdoc(options);

export const swagger = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

// export and download the swagger.json file for postman
export const swaggerJson = (app: Application) => {
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};
