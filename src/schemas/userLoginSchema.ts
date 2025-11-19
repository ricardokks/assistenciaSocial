import z from 'zod'

export const userLoginSchema = z.object({
  cpf: z.string().length(11),
  senha: z.string().min(8),
})

export type userLoginDTO = z.infer<typeof userLoginSchema>
