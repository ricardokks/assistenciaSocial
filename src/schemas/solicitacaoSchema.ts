import { z } from 'zod'

export const solicitacaoSchema = z.object({
  usuarioId: z.string(),
  servicoId: z.string().nonempty("Selecione um serviço"),
  data: z.string().optional(),
  unidadeId: z.string().refine(val => val !== "Selecionar", {
    message: "Por favor, selecione uma assistência adequada",
  }),
  observacoes: z.string().max(500),
  status: z.enum(['ANALISE', 'APROVADO', 'RECUSADO', 'PENDENTE']),
})

export type solicitacaoSchemaDTO = z.infer<typeof solicitacaoSchema>
