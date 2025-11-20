import { api } from '../../lib/axios.config'

export async function logout() {
  try {
    await api.post('/logout')
  } catch {
    return false
  }
}
