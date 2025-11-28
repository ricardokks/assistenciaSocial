import type { NavigationType } from 'react-router-dom'

import { IconeConfigurcao } from '../assets/Icons/IconConfiguracao'
import { IconeConta } from '../assets/Icons/IconConta'
import type { LinksDropboxProps } from '../types/interface-links-dropbox'

export const LinksDropbox: LinksDropboxProps[] = [
  {
    texto: 'Configuração',
    icone: IconeConfigurcao,
    navigate: (id: string) => `/config/${id}`,
  },
  {
    texto: 'Conta',
    icone: IconeConta,
    navigate: (id: string) => `/config/${id}`,
  },
]
