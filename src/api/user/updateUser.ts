import { api } from '../../lib/axios.config'
import type { userEditarDTO } from '../../schemas/userCadastroSchema'

export async function updateUser(data: userEditarDTO, id: string) {
  const formData = new FormData()
  formData.append('nome', data.nome)
  if (data.data_nascimento) {
    const isoDateTime = new Date(data.data_nascimento).toISOString()
    formData.append('data_nascimento', isoDateTime)
  }
  if (data.nome_mae) formData.append('nome_mae', data.nome_mae)
  if (data.localidadeId) formData.append('localidadeId', data.localidadeId)
  if (data.numero_casa) formData.append('numero_casa', data.numero_casa)
  if (data.rua) formData.append('rua', data.rua)
  if (data.complemento) formData.append('complemento', data.complemento)
  if (data.cpf) formData.append('cpf', data.cpf)
  if (data.senha) formData.append('senha', data.senha)

  if (data.assistenciaId) {
    formData.append('assistenciaId', data.assistenciaId)
  }

  try {
    const response = await api.put(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response
  } catch (error) {
    console.log('Falha ao editar um usuário', error)
    throw error
  }
}
