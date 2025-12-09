import type { AssistenciaDTOO } from '../dto/Assistencia/assistenciaDTO'

export interface ModalAssistenciaProps {
  assistencia?: AssistenciaDTOO
  abrilModalAssistencia: boolean
  handleAbrirModalDelete: () => void
}
