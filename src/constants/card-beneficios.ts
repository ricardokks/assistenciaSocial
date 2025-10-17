import { IconePessoaFeliz } from '../assets/Icons/icone-pessoa-feliz'
import { IconeRelogio } from '../assets/Icons/icone-relogio'
import { IconeTelefone } from '../assets/Icons/icone-telefone'
import type { CardBeneficiosProps } from '../types/interface-card-beneficio'

export const TextosCardsBeneficios: CardBeneficiosProps[] = [
  {
    icone: IconeRelogio,
    descricao:
      'Chega de perder tempo esperando no local de atendimento. Agora você escolhe o melhor horário para ser atendido de forma rápida e organizada.',
    titulo: 'Agende sem precisar enfrentar filas',
  },
  {
    icone: IconePessoaFeliz,
    descricao:
      'O sistema é simples e pensado para você. Em poucos passos, seu agendamento está confirmado, sem complicação e sem estresse.',
    titulo: 'Agende de forma fácil',
  },
  {
    icone: IconeTelefone,
    descricao:
      'Com apenas alguns cliques no celular ou no computador, você pode garantir seu horário sem precisar sair de casa. Muito mais praticidade para o seu dia a dia.',
    titulo: 'Faça agendamentos de onde quiser',
  },
]
