import { useEffect, useState } from "react";
import { ConfigUser } from "../../components/config";
import { toast } from "sonner";
import { getUser } from "../../api/user/getUser";
import { useParams } from "react-router-dom";

export function Config() {
    const { id } = useParams()
    const [user, setUser] = useState<any>('CIDADAO')

    /*
        async function getUserById(){
        try {
            const { data } = await getUser(id)
            setUser(data)
        } catch {
            toast.error("Erro ao pegar informações, atualize sua página")
        }
    }
        useEffect(() => {
        getUserById()
    }, [id])
    
     */

    return (
        <ConfigUser.root>
            <ConfigUser.header link={`dashboard/${user.papel || "CIDADAO"}/${id}`} />
            <ConfigUser.opcoes id={id} values={user.config} />
        </ConfigUser.root>
    );
}
