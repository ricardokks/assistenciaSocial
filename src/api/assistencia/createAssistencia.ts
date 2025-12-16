import type { AssistenciaSchemaDTO } from '../../dto/Assistencia/assistenciaDTO'
import { api } from '../../lib/axios.config'

export async function createAssistencia(data: AssistenciaSchemaDTO) {
  const formData = new FormData()

  formData.append('unidade', data.unidade)
  formData.append('localizacao', data.localizacao)
  if (data.icone) formData.append('icone', data.icone)
  formData.append('abrange', JSON.stringify(data.abrange ?? []))
  formData.append('sobre', data.sobre)
  formData.append('subnome', data.subnome)

  const servicos = (data.abrange ?? []).map((nome) => ({ nome }))

  formData.append('servicos', JSON.stringify(servicos))

  const res = await api.post('/assistencias', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res
}
