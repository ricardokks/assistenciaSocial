import type { DadosHomeProps } from "../types/interface-dados-home-props";

// Vamos supor q o value venha do banco
export const dadosHome: DadosHomeProps[] = [
    { 
        id: 1,
        text: 'Total de agendamentos mensais', 
        value: 1212
    },
    { 
        id: 2,
        text: 'Total de agendamentos semanais', 
        value: 540 
    },
    { 
        id: 3,
        text: 'Total de agendamentos diários', 
        value: 60 
    }
]