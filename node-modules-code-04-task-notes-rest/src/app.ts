import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi";




const app = express();

app.use(requestLogger); 
app.use(express.json());

 import routes from "./routes";

app.use("/api", routes);


app.get("/docs/openapi.json", (_req, res) => {
  res.json(openapiSpec);
});


app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(errorHandler);

import { metricsMiddleware } from "./middleware/metrics";
import metricsRouter from "./routes/metrics.routes";
// import routes from "./routes";


app.use(metricsMiddleware);

app.use("/api", routes);
app.use("/api", metricsRouter);

export default app;
