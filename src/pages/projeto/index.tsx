import { useEffect, useState } from "react";
import { getAssistencia } from "../../api/assistencia/getAssistencia";
import { HeaderMobile } from "./components/headerMobileProjeto";
import { HeaderProjeto } from "./components/headerProjeto";
import { toast } from "sonner";
import { InfoAssistencia } from "./section/infoAssistencia";
import { type AssistenciaNOVODTO } from "../../dto/Assistencia/assistenciaDTO";
import { MapaAssistencia } from "./section/mapaAssistencia";
import { IconeLoading } from "../../assets/Icons/icone-loading";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading";

export function Projeto() {
  const [assistencia, setAssistencia] = useState<AssistenciaNOVODTO>()
  const { id } = useParams()
  
  async function pegarDadosAssistencia() {
    try {
      const { data } = await getAssistencia(id)
      setAssistencia(data)

      return data
    } catch {
      toast.error("Erro ao pegar assistencia")
    }
  }

  useEffect(() => {
    pegarDadosAssistencia()
  }, [id])

  if (!assistencia) {
  return (
    <Loading />
  )
}

  return (
    <main className="background-gradient flex h-screen w-screen flex-col items-center overflow-x-hidden p-4 max-md:h-auto max-md:gap-6">
      <HeaderProjeto />
      <HeaderMobile />
      {/* Section */}
      <InfoAssistencia
        abrange={assistencia.abrange}
        descrição={assistencia.descricao}
        icone={assistencia.icone}
        nome={assistencia.unidade}
        subNome={assistencia.subNome}
      />

      {/* Mapa */}
     <MapaAssistencia localizacao={assistencia.localizacao}/>
    </main>
  )
}
