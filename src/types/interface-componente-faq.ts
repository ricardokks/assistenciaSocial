export interface TypeComponenteFAQ {
  id: number
  pergunta: string
  resposta: string
  direcao: boolean
  isOpen?: boolean
  onToggle?: () => void
}
