import { api } from '../../lib/axios.config'

export async function getUser(id?: string) {
  const route = id ? `/usuarios/${id}` : `/usuarios/`

  const { data } = await api.get(route)
  return data
}
