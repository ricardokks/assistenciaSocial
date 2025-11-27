import { api } from '../../lib/axios.config'

export async function getAssistencia(id?: string) {
  const { data } = await api.get(`/assistencias/${id}`)
<<<<<<< HEAD
  return data.data
=======
  return data
>>>>>>> 4b67acfd2b35b590d2345365208082f8efb5e36d
}
