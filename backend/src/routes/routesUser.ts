import  express from "express";
import User from "../controllers/controllersUser.js"

const routerUser = express.Router()

routerUser
.post("/usuario/cadastro",User.cadastroUsuario)
.post("/usuario/login",User.loginUsuario)

export default routerUser