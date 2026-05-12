import { type Request, type Response } from "express";
import { modelTreinner } from "../models/modelTreino.js";
import { catchAsync} from "../utils/traycatch.js";
import { treinoSchemas } from "../schemas/treinoSchema.js";

class controllerTreinner {
    static criarTreino = catchAsync(async (req:Request,res:Response) => {
        
        const dadosValidos = treinoSchemas.parse(req.body)
    
        const userId = (req as any ).userIdToken

        const treinoCriado = await modelTreinner.create({
            ...dadosValidos,
            userId
        });

        res.status(201).json({
            message: "Treino criado com sucesso",
            treino: treinoCriado
        });
    }); 

    static listarTreinos = catchAsync(async (req: Request, res: Response) => {
        const userId = (req as any).userIdToken;

        const treinosListados = await modelTreinner.findAll({
            where: { userId: userId },
            attributes: [
                ['id', 'id_do_treino'], 
                'exercicio',
                'carga',
                'repeticoes'
            ]
        });

        res.status(200).json(treinosListados);
    });

    
    static atualizarTreino = catchAsync(async (req: any, res: Response) => {
        const { id } = req.params;
        const userId = req.userIdToken;

        if (!userId) {
            console.log("ERRO: userIdToken não encontrado no Request");
            const erro: any = new Error("Usuário não autenticado.");
            erro.statusCode = 401;
            throw erro;
        }

        const dadosAtualizados = treinoSchemas.parse(req.body);
        const [numFilasAtualizadas] = await modelTreinner.update(
            { ...dadosAtualizados },
            {
                where: {
                    id: id,     
                    userId: userId
                }
            }
        );

        if (numFilasAtualizadas === 0) {
            const erro: any = new Error("Treino não encontrado ou sem permissão.");
            erro.statusCode = 404;
            throw erro;
        }

        res.status(200).json({ message: "Treino atualizado com sucesso na forja!" });
    });

    static deletarTreino = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = (req as any).userIdToken;
        const treinoDeletado = await modelTreinner.destroy({
            where: { id, userId }
        });

        if (!treinoDeletado) {
            const erro: any = new Error("Treino não encontrado ou sem permissão");
            erro.statusCode = 404;
            throw erro;
        }

        res.status(200).json({ message: "Treino deletado com sucesso" });
    });
}

export default controllerTreinner;