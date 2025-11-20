import { api } from '../../lib/axios.config'

export async function autoLogin() {
  try {
    const response = await api.post('/autologin')
    return response.data
  } catch {
    return false
  }
}
