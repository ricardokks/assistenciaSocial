import { useEffect, useState } from 'react'

import { getAssistencias } from '../../../api/assistencia/getAllAssistencia'
import { IconeLoading } from '../../../assets/Icons/icone-loading'
import { CardProjeto } from '../components/card-projeto'

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

  return (
    <section
      className="relative flex w-full items-start justify-center overflow-hidden px-8 max-md:px-0"
      id="projetos"
    >
      {/* container de informações principais  */}
      <div className="relative m-0 flex size-[100%] h-auto max-w-[1280px] flex-col items-center justify-center gap-12 py-10">
        {/* texto  */}
        <h1
          className="font-outfit-bold text-center text-4xl text-white max-md:text-left px-4"
          data-aos="fade-right"
        >
          Descubra os projetos em que nosso sistema <br className="max-md:hidden" /> atua e podemos
          ajudar.
        </h1>

        {/* container rederização dos cards  */}
        <div className={`gap-y-15 ${assistencias ? 'grid-cols-2 gap-20 max-md:grid-cols-1 max-md:space-y-5 space-y-5' : 'grid-cols-1:'} w-full  max-sm:gap-8`}>
          {assistencias ? (
            assistencias?.map((card: any): any => (
              <CardProjeto key={card.id} animation={true} {...card} />
            ))
          ) : (
            <main className="text-primary-800 flex w-full my-4 flex-col items-center justify-center">
              <div className="relative mb-6 size-40">
                {/* Círculo girando */}

                <IconeLoading />
              </div>

              {/* Texto */}
              <p className="font-satoshi-bold text-white text-center text-lg font-medium">
                Carregando informações, aguarde...
              </p>
            </main>
          )}
        </div>
      </div>
    </section>
  )
}
