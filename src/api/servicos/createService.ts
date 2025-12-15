import { api } from "../../lib/axios.config";

export async function CriarServicos(assistenciaId: string, nome: string){

    const response = await api.post(`/servicos`, {
        assistenciaId,
        nome
    })
    return response.data
}