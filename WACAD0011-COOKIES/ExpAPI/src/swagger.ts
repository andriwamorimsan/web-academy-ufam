import dotenv from "dotenv";
import swaggerAutogen from "swagger-autogen";

dotenv.config();

const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentacao da API",
  },
  host: `${process.env.HOST ?? "localhost"}:${process.env.PORT ?? 4455}`,
  basePath: "/v1",
  definitions: {
    CreateProductDto: {
      name: "Modern Soft Sausages",
      price: 2699.0,
      stockQuantity: 9,
    },
    Product: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      name: "Modern Soft Sausages",
      price: 2699.0,
      stockQuantity: 9,
      createdAt: "2026-06-30T19:27:15.645Z",
      updatedAt: "2026-06-30T19:27:15.645Z",
    },
    LoginDto: {
      email: "admin@shop.test",
      password: "admin123",
    },
  },
};

const outputFile = "./src/swagger-output.json";
const routes = ["./src/router/v1Router.ts"];

swaggerAutogen()(outputFile, routes, doc);
