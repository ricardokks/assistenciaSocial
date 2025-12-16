import { useEffect, useState } from 'react'
import { CardProjeto } from '../components/card-projeto'
import { getAssistencias } from '../../../api/assistencia/getAllAssistencia'

export function SectionProjetosSociais() {
  const [assistencias, setAssistencias] = useState([])

  async function fetchAssistencias() {
    try {
      const response = await getAssistencias()
      setAssistencias(response.data)
    } catch (error) {
      // aa
    }
  }

  useEffect(() => {
    fetchAssistencias()
  }, [])
  
  if (assistencias.length === 0) {
    return null; // Ou um indicador de carregamento, se preferir
  }

  console.log("assistencias:", assistencias);
  return (
    <section
      className="relative flex w-full items-start justify-center overflow-hidden px-8"
      id="projetos"
    >
      {/* container de informações principais  */}
      <div className="relative m-0 flex size-[100%] h-auto max-w-[1280px] flex-col items-center justify-center gap-12 py-10">
        {/* texto  */}
        <h1
          className="font-outfit-bold text-center text-4xl text-white max-md:text-left"
          data-aos="fade-right"
        >
          Descubra os projetos em que nosso sistema <br className="max-md:hidden" /> atua e podemos
          ajudar.
        </h1>

        {/* container rederização dos cards  */}
        <div className="gap-y-15 grid w-full grid-cols-2 gap-20 max-md:grid-cols-1 max-sm:gap-8">
          {assistencias.map((card: any, index): any => (
            <CardProjeto key={card.id} animation={true} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
