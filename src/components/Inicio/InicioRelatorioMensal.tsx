import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { getAllRelatoriosAssistencia } from '../../api/assistencia/getAllRelatoriosAssistencia'
import { relatorionDownload } from '../../api/relatorio/relatorioDonwload'
import { CardRelatorio } from './components/CardRelatorio'

type relatorio = {
  id: string
  mes: number
  ano: number
  dados: any
}

export function InicioRelatorio() {
  const [relatorios, setRelatorios] = useState<relatorio[]>([])
  const a = [
    {
      id: 'relatorio-2025-01',
      ano: 2025,
      mes: 3, // Março
      dados: {
        totalAgendamentos: 124,
        periodo: {
          dia: 8,
          semana: 32,
          mes: 124,
        },
        medias: {
          diariaDoDia: 2,
          diariaDaSemana: 8,
        },
        servicosSolicitados: [
          { nome: 'Atualização do Cadastro Único', quantidade: 45 },
          { nome: 'Solicitação de Benefício', quantidade: 22 },
          { nome: 'Atendimento Psicossocial', quantidade: 17 },
          { nome: 'Encaminhamento Assistencial', quantidade: 40 },
        ],
        status: {
          pendentes: 12,
          aprovados: 95,
          recusados: 17,
        },
        user: {
          nome: 'Funcionário CRAS',
          papel: 'FUNCIONARIO',
        },
        assistencia: {
          unidade: 'CRAS I',
        },
      },
    },
  ]

  const meses: Record<number, string> = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  }

  function procurarMes(id: number) {
    return meses[id]
  }

  async function getRelatorios() {
    try {
      const response = await getAllRelatoriosAssistencia()
      setRelatorios(response)
    } catch {
      toast.error('Erro ao pegar relatórios')
    }
  }

  useEffect(() => {
    getRelatorios()
  }, [])

  async function gerarRelatorioMensal(id: string) {
    return await relatorionDownload(id)
  }

  if (!relatorios) return null

  return (
    <div className="scrollbar-thin-personalizada mt-5 flex h-auto w-full flex-col space-y-3 overflow-y-auto px-2 py-1 pb-[8rem] max-md:pb-[15rem]">
      <h1 className="font-satoshi-black text-primary-800 text-2xl max-md:text-lg">
        Seus relatórios mensais
      </h1>
      {relatorios.length === 0 ? (
        <div className="text-primary-800/60 col-span-3 mt-4 text-center max-md:col-span-1">
          Você ainda não possui relatórios mensais
        </div>
      ) : (
        <>
          {relatorios.map((item) => (
            <CardRelatorio
              ano={item.ano}
              dados={item.dados}
              gerarRelatorio={() => gerarRelatorioMensal(item.id)}
              nomeMes={procurarMes(item.mes)}
              numeroMes={item.mes}
            />
          ))}
        </>
      )}
    </div>
  )
}
