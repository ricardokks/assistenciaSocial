export type Ouvidoria = {
  id: string
  usuarioId: string
  assistenciaId: string
  titulo: string
  descricao: string
  tipo: 'ELOGIO' | 'RECLAMACAO' | 'SUGESTAO'
  status: 'CONCLUIDO' | 'ANALISE' | 'RECUSADO' | 'DOCUMENTO_PENDENTE'
  documentos: DocumentoOuvidoria[]
  resposta?: string
  createdAt: Date
  updatedAt: Date
}

export type DocumentoOuvidoria = {
  id: string
  documentoURL: string
  ouvidoriaId: string
  ouvidoria: Ouvidoria
}
