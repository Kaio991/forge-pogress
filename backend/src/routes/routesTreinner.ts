import express from "express";
import controllerTreinner from "../controllers/controllersTreinners.js";
import { verificacaoToken } from "../middlewares/authMiddleware.js";

const routerTreinner = express.Router()

routerTreinner
.post("/treino/criar",verificacaoToken,controllerTreinner.criarTreino)
.get("/treino/listar",verificacaoToken,controllerTreinner.listarTreinos)
.put("/treino/atualizar/:id",verificacaoToken,controllerTreinner.atualizarTreino)
.delete("/treino/deletar/:id",verificacaoToken,controllerTreinner.deletarTreino)
export default routerTreinner