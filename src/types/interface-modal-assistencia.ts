import type { AssistenciaDTOO } from '../dto/Assistencia/assistenciaDTO'

export interface ModalAssistenciaProps {
  assistencia?: AssistenciaDTOO
  refreshAssistencias: () => void
  abrilModalAssistencia: boolean
  handleAbrirModalDelete: () => void
}
