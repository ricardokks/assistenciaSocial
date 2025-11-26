import type { SolicitacaoDTO } from "./type-solicitacoes";

export type AssistenciaDTO = {
  id: string;
  unidade: string;
  localizacao: string;
  abrange: string[];
  icone: string;
  sobre: string;
  subnome: string;

  // denuncias: DenunciaDTO[];
  // ouvidorias: OuvidoriaDTO[];
  servicos: any[];
  solicitacoes: SolicitacaoDTO[];
  // usuarios: UsuarioDTO[];
};
