type Props = {
  status: string
}

export function TimelineStatus({ status }: Props) {
  const steps = [
    { label: 'Solicitação criada', done: true },
    { label: 'Pendente', done: true },
    {
      label: status === 'RECUSADO' ? 'Recusado' : 'Aprovado',
      done: status === 'CONCLUIDO' || status === 'RECUSADO',
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`size-3 rounded-full ${
              step.done ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          <span className="text-sm text-primary-800">{step.label}</span>
        </div>
      ))}
    </div>
  )
}
