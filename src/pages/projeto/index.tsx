<<<<<<< HEAD
export function Projeto() {
  return (
    <main className="background-gradient flex h-screen w-full items-center justify-center">
      <section className="m-0 flex h-full w-[100%] max-w-[1280px] items-start py-10"></section>
=======
import { useEffect, useState } from "react";
import { getAssistencia } from "../../api/assistencia/getAssistencia";
import { HeaderMobile } from "./components/headerMobileProjeto";
import { HeaderProjeto } from "./components/headerProjeto";
import { toast } from "sonner";
import { InfoAssistencia } from "./section/infoAssistencia";
import { type AssistenciaNOVODTO } from "../../dto/Assistencia/assistenciaDTO";
import { MapaAssistencia } from "./section/mapaAssistencia";
import { IconeLoading } from "../../assets/Icons/icone-loading";

export function Projeto(data: { id: string }) {
  const { id } = data
  const [assistencia, setAssistencia] = useState<AssistenciaNOVODTO>()

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
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white text-primary-800">
      <div
        className="relative w-40 h-40 mb-6"
      >
        {/* Círculo girando */}
        
        <IconeLoading />

      </div>

      {/* Texto */}
      <p className="font-satoshi-bold text-lg font-medium text-center text-primary-800">
        Carregando informações, aguarde...
      </p>
    </main>
  )
}

  return (
    <main className="background-gradient flex-col flex max-md:gap-6 h-screen max-md:h-auto w-screen items-center p-4 overflow-x-hidden">
      <HeaderProjeto />
      <HeaderMobile />
      {/* Section */}
      <InfoAssistencia
        nome={assistencia.unidade}
        subNome={assistencia.subNome}
        icone={assistencia.icone}
        descrição={assistencia.descricao}
        abrange={assistencia.abrange}
      />

      {/* Mapa */}
     <MapaAssistencia localizacao={assistencia.localizacao}/>
>>>>>>> 9372b90750718ea6e2c20ff1e67643d0a24cf263
    </main>
  )
}
