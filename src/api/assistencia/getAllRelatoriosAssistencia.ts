import { api } from "../../lib/axios.config";

export async function getAllRelatoriosAssistencia(){
    const { data } = await api.get('/assistencia/relatorios')
    return data.data
}