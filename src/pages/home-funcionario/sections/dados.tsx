import { useEffect, useState } from 'react'

import { getAssistencia } from '../../../api/assistencia/getAssistencia'
import { PegarInformacaoFuncionario } from '../../../api/user/pegarInformacaoFuncionario'
import { HeaderDashboards } from '../../../components/header'
import type { AssistenciaDTOO } from '../../../dto/Assistencia/assistenciaDTO'
import { SkeletonDados } from '../components/skeleton/skeleton-dados'

export function Dados() {
  // estados e variaveis utilizadas no componente
  const [idInstituicao, setIdInstituicao] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dadosInstituicao, setDadosInstituicao] = useState<AssistenciaDTOO | null>(null)

  // Funções Chamadadoras da API do backend
  async function fetchIdInstituicao() {
    const response = await PegarInformacaoFuncionario()
    if (response && response.data && response.data.data) {
      {
        setIdInstituicao(response.data.data.assistenciaId)
        setLoading(true)
      }
    }
  }

  async function fetchDadosInstituicao(id: string) {
    const response = await getAssistencia(id)
    const dados: AssistenciaDTOO = {
      id: response.id,
      abrange: response.abrange,
      icone: response.icone,
      localizacao: response.localizacao,
      sobre: response.sobre,
      subnome: response.subnome,
      unidade: response.unidade,
    }

    setDadosInstituicao(dados)
  }

  // Pegar ID da instituição
  useEffect(() => {
    fetchIdInstituicao()
  }, [])

  // Pegar os dados da Instituição
  useEffect(() => {
    if (loading === true) {
      fetchDadosInstituicao(idInstituicao ?? '')
    }
  }, [idInstituicao])

  return (
    <main className="main overflow-y-auto">
      {/* componente header  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil user="PROFISSIONAL" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      {/* container de informações principais  */}
      {loading ? (
        <div className="font-outfit  max-md:pb-42 flex size-full flex-col gap-4">
          {/* container de informações foto, nome, subnome */}
          <div className="flex w-full items-center justify-start gap-4 rounded-2xl p-4 shadow-md outline-2 outline-[#262626]/10">
            {/* foto  */}
            <div className="relative">
              <img alt="Foto do projeto" src={dadosInstituicao?.icone ?? ''} width={60} />
            </div>

            {/* nome e subnome */}
            <div className="flex flex-col justify-center leading-4">
              {/* nome  */}
              <div className="relative flex w-full items-center gap-2">
                <h1 className="color-text font-outfit-bold text-[1.4rem]">
                  {dadosInstituicao?.unidade}
                </h1>
              </div>

              {/* subnome */}
              <div className="flex items-center gap-2">
                <p className="color-text">{dadosInstituicao?.subnome}</p>
              </div>
            </div>
          </div>

          {/* container sobre a assistencia */}
          <div className="relative flex w-full flex-col items-start justify-start gap-4 rounded-2xl border-2 border-[#262626]/10 p-4 shadow-md">
            <div className="flex w-full flex-col">
              <h1 className="text-primary-800 font-outfit-bold">Sobre a assistencia :</h1>

              <div className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
                <h1>{dadosInstituicao?.sobre}</h1>
              </div>
            </div>

            {/* container de abrange a  */}
            <div className="flex w-full flex-col gap-3">
              <h1 className="text-primary-800 font-outfit-bold">Abrange a:</h1>

              <div className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
                <h1>{dadosInstituicao?.abrange}</h1>
              </div>
            </div>

            {/* container de localização  */}
            <div className="flex w-full flex-col gap-6">
              <h1 className="text-primary-800 font-outfit-bold">Localização</h1>

              <div className="font-outfit text-primary-800 focus:border-primary-800 w-full rounded-2xl border-2 border-[#999] p-4 outline-none duration-500 ease-in-out">
                <h1>{dadosInstituicao?.localizacao}</h1>
              </div>

              <iframe
                allowFullScreen
                className="h-[95%] w-full rounded-2xl border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(dadosInstituicao?.localizacao || '')}&output=embed`}
              />
            </div>
          </div>
        </div>
      ) : (
        <SkeletonDados />
      )}
    </main>
  )
}
