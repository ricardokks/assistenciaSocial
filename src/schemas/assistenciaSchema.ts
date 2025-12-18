import { z } from 'zod'

export const AssistenciaSchema = z.object({
  unidade: z.string().min(1, { message: 'O nome da instituição é obrigatório.' }),

  localizacao: z.string().min(5, { message: 'A localização é obrigatória.' }),

  subnome: z.string().min(4, { message: 'O resumo da instituição é obrigatório.' }),

  sobre: z.string().min(1, { message: 'A descrição da assistência é obrigatória.' }),

  abrange: z
    .array(z.string().min(1))
    .min(1, { message: 'Informe pelo menos uma área de atuação.' }),

  icone: z.instanceof(File).optional(),
})

/*model Assistencia {
  id           String         @id @default(uuid())
  unidade      String         @unique
  localizacao  String
  abrange      String[]
  icone        String?
  sobre        String
  subnome      String
  denuncias    Denuncia[]
  ouvidorias   Ouvidoria[]
  servicos     Servico[]
  solicitacoes Solicitacoes[]
  usuarios     Usuario[]
} */
