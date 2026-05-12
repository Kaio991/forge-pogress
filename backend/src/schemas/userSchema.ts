import {z} from "zod"

export const userSchema = z.object(
    {
        nome: z.string().min(3, "Nome deve ter pelo menos 3 letras"),
        idade: z.number().int().positive(),
        email: z.string().email("E-mail inválido"),
        senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
        peso: z.number().positive(),
        altura: z.number().positive()
    }
)

export const userLogin = z.object(
    {
        email: z.string().email("Email invalido"),
        senha: z.string().min(1, "Senha invalida")
    }
)

