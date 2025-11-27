import { z } from "zod";

export const solicitacaoSchema = z.object({
  usuarioId: z.string(),
  servicoId: z.string(),
  data: z.string().optional(),
  unidadeId: z.string(),
  observacoes: z.string().max(500),
  status: z
    .enum(["ANALISE", "APROVADO", "RECUSADO", "PENDENTE"])
});

export type solicitacaoSchemaDTO = z.infer<typeof solicitacaoSchema>;