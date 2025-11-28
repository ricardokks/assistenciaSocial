import z from 'zod'

export const configSchema = z.object({
  idioma: z.enum(['PORTUGUES', 'LIBRAS']),
  tamanhoFonte: z.number(),
  notificacao: z.boolean(),
  temaEscuro: z.boolean(),
})

export type configuracaoSchemaDTO = z.infer<typeof configSchema>
