import { z } from "zod";

export const solicitacaoSchema = z.object({
  usuarioId: z.string(),
  servicoId: z.string(),
  data: z.string().optional(),
  unidadeId: z.string(),
  observacoes: z.string().min(10).max(500).optional(),
  status: z
    .enum(["ANALISE", "APROVADO", "RECUSADO", "PENDENTE"])
});

export type solicitacaoSchemaDTO = z.infer<typeof solicitacaoSchema>;