
/*
model Usuario {
    id                    String               @id @default(uuid())
    nome                  String
    localidade            Localidade 
    numero_casa           String
    rua                   String
    complemento           String     
    email                 String               @unique   
    rg                    String
    rg_nonce              String
    rg_hash               String               @unique
    cpf                   String               
    cpf_nonce             String
    cpf_hash              String               @unique
    nis                   String               
    nis_nonce             String
    nis_hash              String               @unique
    telefone              String
    senha                 String
    papel                 Papel                @default(CIDADAO)
    avatarURL               String?
    assistenciaId         String?
    assistencia           Assistencia?         @relation(fields: [assistenciaId], references: [id])
    solicitacoes          Solicitacoes[]
    configuracao          Configuracao?
    atividades            Atividade[]     @relation("UsuariosAtividades")
    ouvidorias            Ouvidoria[]
}
*/

export type UsuarioDTO = {
    id: string;
    nome: string;
    localidade: string;
    numero_casa: string;
    rua: string;
    complemento: string;
    email: string;
    rg: string;
    cpf: string;
    nis: string;
    telefone: string;
    papel: 'CIDADAO' | 'ASSISTENCIA' | 'ADMIN';
    avatarURL?: string;
    assistenciaId?: string;
    configuracaoId?: string;

    solicitacoes:  Solicitacoes[];
    configuracao:  Configuracao?;
    atividades:    Atividade[];
    ouvidorias:    Ouvidoria[];

}