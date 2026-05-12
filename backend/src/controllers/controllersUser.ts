import { ModelUser } from "../models/modelUser.js";
import bcrypt from "bcrypt"
import { userSchema,userLogin } from "../schemas/userSchema.js";
import {type Request, type Response } from "express"
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/traycatch.js";

class User {
    static cadastroUsuario = catchAsync(async (req: Request, res: Response) => {
      
        const dadosValidados = userSchema.parse(req.body);

        const senhaHash = await bcrypt.hash(dadosValidados.senha, 10);

        const novoUsuario = await ModelUser.create({
            ...dadosValidados,
            senha: senhaHash
        });

        res.status(201).json({
            message: "Usuario cadastrado com sucesso",
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email
            }
        });
    });


    static loginUsuario = catchAsync(async (req: Request, res: Response) => {
        
        const { email, senha } = userLogin.parse(req.body);
        console.log("Dados recebidos",req.body);
        
        const usuario = await ModelUser.findOne({ where: { email } });

        if (!usuario) {
            const erro: any = new Error("E-mail ou senha incorretos");
            erro.statusCode = 401;
            throw erro;
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            const erro: any = new Error("E-mail ou senha incorretos");
            erro.statusCode = 401;
            throw erro;
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.SECRET || "palavra_Secreta",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login realizado com sucesso!",
            id:usuario.id,
            nome: usuario.nome,
            token
        });
    });
}



export default User