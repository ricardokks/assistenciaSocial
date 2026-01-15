import { api } from "../../lib/axios.config";

export async function getAllAgendamentosByUserId(cursor?: string){
    const { data } = await api.get("/solicitacoes/user", {
        params: { cursor }
    })
    return data
}