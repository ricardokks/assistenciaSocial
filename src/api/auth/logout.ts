import { api } from '../../lib/axios.config'

export async function logout() {
  try {
    await api.delete('/logout')
  } catch {
    return false
  }
}
