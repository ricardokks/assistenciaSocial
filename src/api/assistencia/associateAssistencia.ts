import { api } from "../../lib/axios.config";

export async function associateAssistencia(funcionarioId: string, assistenciaId: string) {
  const { data } = await api.put('/assistencias/associate', {
    funcionarioId,
    assistenciaId,
  })

  return data
}
