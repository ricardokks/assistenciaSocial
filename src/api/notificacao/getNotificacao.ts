import { api } from "../../lib/axios.config";

export async function getNotificacoes(userId: string) {
  const { data } = await api.get(`/notificacoes/${userId}`)
  return data
}
