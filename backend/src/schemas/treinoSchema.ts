import {z} from "zod";

export const treinoSchemas = z.object(
    {
        exercicio:z.string().min(3,"O nome do exercicio deve possuir ao minimo 3 letras"),
        carga: z.number().positive("A carga deve ser um numero positivo"),
        repeticoes: z.number().int().min(1,"Minimo de repeticoes 1")
    }
)