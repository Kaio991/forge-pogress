import "dotenv/config"
import express from "express";
import { iniciarBancoDeDados,sequelize } from "./src/db/db.js";
import { ModelUser } from "./src/models/modelUser.js";
import routerUser from "./src/routes/routesUser.js";
import routerTreinner from "./src/routes/routesTreinner.js";
import { verificacaoToken } from "./src/middlewares/authMiddleware.js";
import { errorGlobal } from "./src/middlewares/tratamentoDeErros.js";
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const swaggerPath = path.join(__dirname, "src", "docs", "swagger.json");
const swaggerFile = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));


app.use(express.json())

iniciarBancoDeDados()

app.use(cors())
app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routerUser)
app.use(routerTreinner)

app.use(errorGlobal)

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});