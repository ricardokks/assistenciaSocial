import { Accessibility, Trash2, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { AnimatedEye, AnimatedEyeControlled } from '../../../components/ui/eye'
import { AnimatedTrashControlled } from '../../../components/ui/trashAnimate'

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
  const [isEyeOpen, setIsEyeOpen] = useState(false)
  const [isTrashOpen, setIsTrashOpen] = useState(false)

  const x = useMotionValue(0)

  useEffect(() => {
    const unsubscribe = x.onChange((value) => {
      setIsEyeOpen(value > 0)      // abre olho se arrastar pra direita
      setIsTrashOpen(value < 0)    // abre lixo se arrastar pra esquerda
    })
    return () => unsubscribe()
  }, [x])

  // Sombra do card baseada no drag
  const shadow = useTransform(
    x,
    [-150, 0, 150],
    [
      '0px 0px 25px rgba(255,0,0,0.3)',
      '0px 0px 10px rgba(0,0,0,0.1)',
      '0px 0px 25px rgba(0,0,255,0.3)',
    ]
  )

  // Escala e opacidade dos ícones
  const trashScale = useTransform(x, [-150, -50, 0], [1, 0.8, 0])
  const eyeScale = useTransform(x, [0, 50, 150], [0, 0.8, 1])
  const trashOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const eyeOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1])

  return (
    <div className="relative overflow-visible">
     {/* Ícone Lixeira - com fundo elegante */}
<motion.div
 style={{ scale: trashScale, opacity: trashOpacity }}
  className="absolute right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-2 items-center justify-center md:hidden"
>
  <div className="rounded-full bg-red-100/80 p-4 backdrop-blur-sm shadow-lg ring-2 ring-red-200/50 flex space-y-2">
    <AnimatedTrashControlled size={32} color="#dc2626" isOpen={isTrashOpen} strokeWidth={1.5} />
  </div>
  <span className="text-[18px]  font-satoshi font-bold text-red-500">Deletar</span>
</motion.div>

{/* Ícone Olho - com fundo elegante */}
<motion.div
  style={{ scale: eyeScale, opacity: eyeOpacity }}
  className="absolute left-5 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-2 items-center justify-center md:hidden"
>
  <div className="rounded-full bg-blue-100/80 p-4 backdrop-blur-sm shadow-lg ring-2 ring-blue-200/50 space-y-2 flex-col flex">
    <AnimatedEyeControlled size={32} color="#194a99" isOpen={isEyeOpen} strokeWidth={1.5} />
  </div>
  <span className="text-[18px]  font-satoshi font-bold text-primary-800">Visualizar</span>
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
        {/* Ícone de Ajuda */}
        <Accessibility
          className="absolute right-3 top-3 z-20 cursor-pointer text-primary-800 md:hidden"
          onClick={() => setShowHint((prev) => !prev)}
        />

        {/* Hint visual */}
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

        {/* Conteúdo do Card */}
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
