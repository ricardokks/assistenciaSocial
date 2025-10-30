import { z } from "zod";

// ===== Enums =====
export const LocalidadeEnum = z.enum([
  "AIUA",
  "IPAGUACU_MIRIM",
  "LOCALIDADE_CACIMBA_VELHA",
  "ARARINHA",
  "ARRAIAL",
  "BAIXIO",
  "CACIMBINHA",
  "CAMPESTRE",
  "CASA_FORTE",
  "CONTENDAS",
  "CURU",
  "FAZENDINHA",
  "GREGORIO",
  "GROSSOS",
  "JATOBA",
  "MADEIRO",
  "MERUOQUINHA",
  "MORGADO",
  "PASSAGEM",
  "PAUS_BRANCO",
  "PE_DA_SERRA",
  "RAIZ",
  "RIACHAO_DOS_FARIAS",
  "RIACHO_FUNDO",
  "RIO_DO_CANTO",
  "SALGADINHO",
  "SANTA_LUZIA",
  "SANTO_AMARO",
  "SAO_DAMIAO",
  "TAPERA_ALTA",
  "TAPERA_BAIXA",
  "TERRA_NOVA",
  "TRAPIA",
  "VASSOURAS",
  "VAZEA_DA_CRUZ",
  "MUMBABA",
  "PADRE_LINHARES",
  "TANGENTE",
  "TUINA",
  "ALTO_DA_BOA_VISTA",
  "ALTO_DA_CADEIA",
  "BAIRRO_CAMPO_DO_MILLE",
  "BAIRRO_DO_CEMITÉRIO",
  "BANDEIRA_BRANCA",
  "CARTUCHA",
  "CENTRO",
  "COHAB",
  "CORTE_DO_ANANÁS",
  "CRUZEIRO",
  "LUIZ_DA_HORA_PEREIRA",
  "MANIVAO",
  "MARAMBAIA",
  "MUMBABA_DE_BAIXO",
  "MUMBABA_DE_CIMA",
  "NOSSA_SENHORA_DE_FATIMA",
  "RODAGEM",
  "SANTA_URSULA",
  "TAMANDUA",
]);

export const PapelEnum = z.enum([
    "ADMINISTRADOR",
    "CIDADAO",
    "GESTOR",
    "PROFISSIONAL",
    "SECRETARIO"
]);

// ===== Usuario Schema =====
export const userCadastroSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  localidade: LocalidadeEnum,
  numero_casa: z.string().min(1, "O número da casa é obrigatório"),
  rua: z.string().min(2, "A rua deve ter pelo menos 2 caracteres"),
  complemento: z.string().optional(),
  email: z.email("E-mail inválido"),
  rg: z.string().min(5, "O RG deve conter pelo menos 5 caracteres"),
  cpf: z.string(),
  nis: z.string(),


  telefone: z
    .string(),

  senha: z.string().min(8, "A senha deve ter pelo menos 6 caracteres"),

  papel: PapelEnum.default("CIDADAO"),
  avatarURL: z.string().optional(),

  assistenciaId: z.string().optional(),

  // relacionamentos
  assistencia: z.any().optional(),
  solicitacoes: z.array(z.any()).optional(),
  configuracao: z.any().optional(),
  atividades: z.array(z.any()).optional(),
  ouvidorias: z.array(z.any()).optional(),
});

export type userCadastroDTO = z.infer<typeof userCadastroSchema>