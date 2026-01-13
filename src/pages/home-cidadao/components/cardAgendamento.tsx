import { Accessibility, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { toast } from 'sonner'

import { ButtonInfo } from '../../../components/ui/buttonInfo'
import { ButtonStatus } from '../../../components/ui/buttonStatus'

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

export function AgendamentoCard({
  item,
  onVisualizar,
  onVisualizarGlobal,
  onDelete,
}: {
  item: any
  onVisualizar: () => void
  onVisualizarGlobal: () => void
  onDelete: () => void
}) {
  const controls = useAnimation()
  const [showHint, setShowHint] = useState(false)

  const x = useMotionValue(0)

  // Shadow sutil
  const shadow = useTransform(
    x,
    [-150, 0, 150],
    [
      '0px 0px 25px rgba(255,0,0,0.3)',
      '0px 0px 10px rgba(0,0,0,0.1)',
      '0px 0px 25px rgba(0,0,255,0.3)',
    ]
  )

  // Escala dos ícones
  const trashScale = useTransform(x, [-150, -50, 0], [1.2, 0.8, 0])
  const eyeScale = useTransform(x, [0, 50, 150], [0, 0.8, 1.2])

  // Opacidade dos ícones
  const trashOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const eyeOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1])

  return (
    <div className="relative">
      {/* ÍCONE LIXEIRA VERMELHA LADO ESQUERDO */}
      <motion.div
        style={{ scale: trashScale, opacity: trashOpacity }}
        className="absolute left-0 top-1/2 -translate-y-1/2 pl-4"
      >
        <Trash2 className="text-red-600" size={28} />
      </motion.div>

      {/* ÍCONE OLHO AZUL LADO DIREITO */}
      <motion.div
        style={{ scale: eyeScale, opacity: eyeOpacity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 pr-4"
      >
        <Eye className="text-blue-600" size={28} />
      </motion.div>

      {/* CARD */}
      <motion.div
        drag="x"
        style={{ x, boxShadow: shadow }}
        dragElastic={0.15}
        dragConstraints={{ left: -150, right: 150 }}
        animate={controls}
        onDragEnd={(_, info) => {
          if (info.offset.x > 120) {
            item.status === 'CONCLUIDO'
              ? onVisualizar()
              : onVisualizarGlobal()
          } else if (info.offset.x < -120) {
            if (item.status !== 'PENDENTE') {
              toast.error('Não é possível excluir este agendamento')
            } else {
              onDelete()
            }
          }

          // Volta para o centro
          controls.start({
            x: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 25,
            },
          })
        }}
        className="relative z-10 flex h-full flex-col rounded-2xl bg-white p-4"
      >
        {/* ÍCONE DE AJUDA */}
        <Accessibility
          className="absolute right-3 top-3 z-20 cursor-pointer text-primary-800"
          onClick={() => setShowHint((prev) => !prev)}
        />

        {/* HINT VISUAL */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute right-3 top-10 z-30 w-52 rounded-xl bg-neutral-800/90 px-3 py-2 text-xs text-white shadow-lg backdrop-blur"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">→</span>
                  <span>Arraste para visualizar</span>
                </div>

                <div className="h-px w-full bg-white/20" />

                <div className="flex items-center space-x-2">
                  <span className="text-red-400">←</span>
                  <span>Arraste para excluir</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTEÚDO DO CARD */}
        <div className="flex w-full space-x-5">
          <img className="size-12" src={item.assistencia.icone} />
          <div className="flex flex-col">
            <span className="font-outfit-bold text-primary-800 text-lg">
              {item.assistencia?.unidade}
            </span>
            <span className="font-outfit text-primary-800/75 text-sm">
              Data de solicitação: {formatDate(item.dataCriacao)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex w-full">
          <div className="flex w-full flex-col">
            <span className="font-outfit text-primary-800 text-[14px]">
              Serviço solicitado
            </span>
            <span className="font-satoshi text-primary-800 text-[12px] font-medium">
              {item.assistencia?.servicos?.find(
                (svc: any) => svc.id === item.servicoId
              )?.nome}
            </span>
          </div>

          <div className="flex w-full flex-col">
            <span className="font-outfit text-primary-800 text-[14px]">
              Status do agendamento
            </span>
            <ButtonStatus status={item.status} />
          </div>
        </div>

        <div className="mt-auto pt-4">
          <ButtonInfo
            status={item.status}
            onClickAguardandoAnalise={() =>
              toast.info('Análise do seu agendamento está sendo realizada')
            }
            onClickDelete={onDelete}
            onClickRecusado={() =>
              toast.error(
                item.observacoesFuncionario
                  ? `Após análise, seu agendamento foi recusado. Observação: ${item.observacoesFuncionario}`
                  : 'Após análise, seu agendamento foi recusado'
              )
            }
            onClickVisualizarInfo={() =>
              item.status === 'CONCLUIDO'
                ? onVisualizar()
                : onVisualizarGlobal()
            }
          />
        </div>
      </motion.div>
    </div>
  )
}
