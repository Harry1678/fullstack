import swaggerJSDoc from "swagger-jsdoc";

export const openapiSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "REST API for managing tasks",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], 
});
