import { type Request, type Response, type NextFunction } from "express";
import  Jwt  from "jsonwebtoken";

export const verificacaoToken = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const tokenRecebido = req.headers.authorization

        if (!tokenRecebido) {
          return res.status(404).json(
                {
                    message:"Token invalido ou não inserido"
                }
            )
        }
        const tokenValido = tokenRecebido.replace("Bearer ", "");

        if (!tokenValido) {
            return res.status(401).json(
                {
                    message:"Token invalido por favor digite um de acordo"
                }
            )
        }  

        const decode = Jwt.verify(tokenValido, process.env.SECRET as string)
        console.log(decode);
        
        (req as any).userIdToken =( decode as any).id;


        next()

    } catch (error) {
        return res.status(401).json({
            message: "Token inválido ou expirado",
            error: console.log(error)
        });
        
        
    }
}