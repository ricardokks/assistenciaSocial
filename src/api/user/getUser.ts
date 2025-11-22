import { api } from '../../lib/axios.config'

export async function getUser(id?: string) {
  const route = id ? `/users/${id}` : `/users/`

  const { data } = await api.get(route)
  return data.data
}
