import { api } from "../../lib/axios.config";

export async function findAllLocalidades() {
    try {
        const response = await api.get('/localidades/all')

        return response.data
    } catch(error) {
        return error
    }
}