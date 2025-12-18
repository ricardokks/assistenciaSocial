import { InicioDados } from './InicioDados'
import { InicioNotificacao } from './InicioNotificacao'
import { InicioRelatorio } from './InicioRelatorioMensal'
import { InicioRoot } from './InicioRoot'

export const InicioDashBoard = {
  root: InicioRoot,
  dados: InicioDados,
  notificacao: InicioNotificacao,
  relatorio: InicioRelatorio,
}
