import { api } from "../../lib/axios.config";

export async function getAssistencia(id: string){
    const { data } = await api.get(`/assistencia/${id}`)
    return data
}