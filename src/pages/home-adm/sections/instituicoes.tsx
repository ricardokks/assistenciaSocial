import { useEffect, useState } from 'react'

import { set } from 'zod'

import { getAssistencias } from '../../../api/assistencia/getAllAssistencia'
import { IconeMais } from '../../../assets/Icons/icone-mais'
import { IconeSearch } from '../../../assets/Icons/icone-search'
import { HeaderDashboards } from '../../../components/a'
import type { AssistenciaDTOO } from '../../../dto/Assistencia/assistenciaDTO'
import { api } from '../../../lib/axios.config'
import type { IHomeProps } from '../../../types/interface-home-props'
import { Instituicao } from '../components/layout/instituicao'
import { ModalCriarInst } from '../components/modals-inst/modal-criar'
import { ModalDeletarInst } from '../components/modals-inst/modal-deletar'
import { ModalEditarInst } from '../components/modals-inst/modal-editar'

export function Instituicoes(data: IHomeProps) {
  const [abrirModalDelete, setAbrirModalDelete] = useState<boolean>(false)
  const [abrirModalCreate, setAbrirModalCreate] = useState<boolean>(false)
  const [abrirModalEdit, setAbrirModalEdit] = useState<boolean>(false)

  const [idInstituicao, setIdInstituicao] = useState<string>('')
  const [instituicao, setInstituicao] = useState<AssistenciaDTOO>()

  const [instituicoes, setInstituicoes] = useState<AssistenciaDTOO[]>([])

  async function RefreshAllInst() {
    const res = await getAssistencias()
    setInstituicoes(res.data)
  }

  useEffect(() => {
    RefreshAllInst()
  }, [])

  return (
    <main className="main flex  h-full flex-col items-start space-y-6 overflow-hidden pr-4 max-md:w-full max-md:px-4">
      {/* Header da aplicação  */}
      <HeaderDashboards.root>
        <HeaderDashboards.perfil data={data.data} user="ADMINISTRADOR" />
        <HeaderDashboards.notificacao />
      </HeaderDashboards.root>

      <div className="max-lg:pb-30 flex size-full flex-col">
        <h1 className="font-outfit-bold text-primary-800 text-xl">Instituições</h1>
        <div className="mt-3 flex w-full justify-between">
          <div className="relative w-2/3">
            <IconeSearch className="absolute mt-3 translate-x-3"></IconeSearch>
            <input
              className="font-satoshi border-primary-800 text-primary-800 placeholder:text-primary-800/65 w-full rounded-2xl border-2 p-2 pl-9 outline-0"
              placeholder="Procurar por nome..."
              type="text"
            />
          </div>

          <button
            className="bg-primary-800 max-md:text-sm font-outfit-bold text-nowrap hover:bg-primary-800/90 flex cursor-pointer items-center justify-center gap-3 rounded-[5.97px]  p-2 text-white duration-500 ease-in-out"
            onClick={() => setAbrirModalCreate(true)}
          >
            <IconeMais className="size-4 text-white" /> Nova Instituição
          </button>
        </div>

        <div className="bg-primary-800/20 mt-4 h-[2px] w-full"></div>

        <div className="mb-28 mt-2 grid size-full grid-cols-3 gap-2 overflow-y-auto overflow-x-hidden max-md:grid-cols-2 max-sm:grid-cols-1">
          {instituicoes.map((inst) => (
            <Instituicao
              key={inst.id}
              instituicao={inst}
              setDelete={() => setAbrirModalDelete(true)}
              setEdit={() => setAbrirModalEdit(true)}
              setId={() => setIdInstituicao(inst.id)}
              setInstituicao={() => setInstituicao(inst)}
            ></Instituicao>
          ))}
        </div>

        <ModalDeletarInst
          abrilModalAssistencia={abrirModalDelete}
          handleAbrirModalDelete={() => setAbrirModalDelete(false)}
          id={idInstituicao}
          refreshAssistencias={() => RefreshAllInst()}
        ></ModalDeletarInst>

        <ModalCriarInst
          abrilModalAssistencia={abrirModalCreate}
          handleAbrirModalDelete={() => setAbrirModalCreate(false)}
          refreshAssistencias={() => RefreshAllInst()}
        ></ModalCriarInst>

        <ModalEditarInst
          abrilModalAssistencia={abrirModalEdit}
          assistencia={instituicao!}
          handleAbrirModalDelete={() => setAbrirModalEdit(false)}
          refreshAssistencias={() => RefreshAllInst()}
        ></ModalEditarInst>
      </div>
    </main>
  )
}
