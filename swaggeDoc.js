const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Documentação da TODO API",
        description: "Simples exemplo de documentação com Swagger",
        contact: {
          name: "Kako Ferrare"
        },
        servers: ["http://localhost:5000"]
      }
    },
    // ['.routes/*.js']
    apis: ['./src/routes/*.js']
  };


const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}