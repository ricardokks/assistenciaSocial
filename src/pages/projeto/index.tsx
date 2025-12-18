import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { toast } from 'sonner'

import { getAssistencia } from '../../api/assistencia/getAssistencia'
import { Loading } from '../../components/loading'
import type { AssistenciaDTO } from '../../types/type-assistencia'
import { HeaderMobile } from './components/headerMobileProjeto'
import { HeaderProjeto } from './components/headerProjeto'
import { InfoAssistencia } from './section/infoAssistencia'
import { MapaAssistencia } from './section/mapaAssistencia'

export function Projeto() {
  const [assistencia, setAssistencia] = useState<AssistenciaDTO>()
  const { id } = useParams()

  async function pegarDadosAssistencia() {
    try {
      const data = await getAssistencia(id)
      setAssistencia(data)
      console.log('Data: ', data)
      return data
    } catch {
      toast.error('Erro ao pegar assistencia')
    }
  }

  useEffect(() => {
    pegarDadosAssistencia()
  }, [id])

  if (!assistencia) {
    return <Loading />
  }

  return (
    <main className="background-gradient flex h-screen w-screen flex-col items-center overflow-x-hidden p-4 max-md:h-auto max-md:gap-6">
      <HeaderProjeto />
      <HeaderMobile />
      {/* Section */}
      <InfoAssistencia
        abrange={assistencia.abrange}
        descrição={assistencia.sobre}
        icone={assistencia.icone}
        localizacao={assistencia.localizacao}
        nome={assistencia.unidade}
        subNome={assistencia.subnome}
      />

      {/* Mapa */}
      <MapaAssistencia localizacao={assistencia.localizacao} />
    </main>
  )
}
