import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";

export const errorGlobal = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: "error",
            message: "Dados de entrada inválidos",
            errors: err.flatten().fieldErrors
        });
    }
    
    const statusCode = err.statusCode || 500
    const message = err.message || "Erro interno do servidor"

    res.status(statusCode).json(
        {
            status: "error",
            statusCode,
            message
        }
    )

}