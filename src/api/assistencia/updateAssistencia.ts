import { ZodTemplateLiteral } from 'zod'

import type { AssistenciaSchemaDTO } from '../../dto/Assistencia/assistenciaDTO'
import { api } from '../../lib/axios.config'

export async function updateAssistencia(data: AssistenciaSchemaDTO, id: string | undefined) {
  const formData = new FormData()

  if (data.unidade) formData.append('unidade', data.unidade)
  if (data.localizacao) formData.append('localizacao', data.localizacao)
  if (data.icone) formData.append('icone', data.icone)
  if (data.abrange) formData.append('abrange', JSON.stringify(data.abrange ?? []))

  if (data.sobre) formData.append('sobre', data.sobre)
  if (data.subnome) formData.append('subnome', data.subnome)

  const res = await api.put(`/assistencias/${id}`, formData)

  return res
}
