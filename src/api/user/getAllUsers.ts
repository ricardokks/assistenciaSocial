import { api } from '../../lib/axios.config'

export async function GetAllUsers() {
  const res = await api.get('./users')
  return res.data
}
