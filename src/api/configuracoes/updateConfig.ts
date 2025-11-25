import { api } from '../../lib/axios.config'
import type { configuracaoSchemaDTO } from '../../schemas/userConfigSchema'

export async function configuracoes(data: configuracaoSchemaDTO) {
  try {
    const response = await api.put('/configuracoes', data)
    return response
  } catch (error) {
    return console.log('Erro', error)
  }
}
