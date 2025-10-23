import { IconeAtendimento } from '../assets/Icons/iconeAtendimento'
import { IconeDados } from '../assets/Icons/iconeDados'
import { IconHome } from '../assets/Icons/iconeHome'
import { IconeInstituicao } from '../assets/Icons/iconeInstituicao'
import { IconeLupa } from '../assets/Icons/iconeLupa'
import { IconeUsuario } from '../assets/Icons/iconeUsuario'
import type {
  LinksDashboardAdministradorProps,
  LinksDashboardCidadaoProps,
  LinksDashboardFuncionarioProps,
} from '../types/interface-links-dashboard'

export const LinksDashboardFuncionario: LinksDashboardFuncionarioProps[] = [
  {
    id: 'Inicio',
    icone: IconHome,
    nomeLink: 'Início',
  },
  {
    id: 'Atendimento',
    icone: IconeAtendimento,
    nomeLink: 'Atendimento',
  },
  {
    id: 'Dados',
    icone: IconeDados,
    nomeLink: 'Dados',
  },
  {
    id: 'Usuarios',
    icone: IconeUsuario,
    nomeLink: 'Usuários',
  },
]

export const LinksDashboardAdministrador: LinksDashboardAdministradorProps[] = [
  {
    id: 'Inicio',
    icone: IconHome,
    nomeLink: 'Home',
  },
  {
    id: 'Instituicao',
    icone: IconeInstituicao,
    nomeLink: 'Instituições',
  },
  {
    id: 'Usuarios',
    icone: IconeUsuario,
    nomeLink: 'Usuários',
  },
]

export const LinksDashboardUsuario: LinksDashboardCidadaoProps[] = [
  {
    id: 'Inicio',
    icone: IconHome,
    nomeLink: 'Home',
  },
  {
    id: 'ContatarAtendimento',
    icone: IconeAtendimento,
    nomeLink: 'Contatar Atendimento',
  },
  {
    id: 'ProcurarServico',
    icone: IconeLupa,
    nomeLink: 'Procurar Serviços',
  },
]
