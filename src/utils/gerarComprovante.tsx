import {
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Printer,
  User,
} from 'lucide-react'
import React, { useRef } from 'react'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface DadosUsuario {
  nome: string
  cpf: string
  localizacao: string
}

interface DadosAssistencia {
  nome: string
  servico: string
  localizacao: string
  dataAgendamento: string
  horaAgendamento: string
}

interface ComprovanteProps {
  usuario: DadosUsuario
  assistencia: DadosAssistencia
  dataEmissao: string
  horaEmissao: string
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
    <div>
      <span className="text-muted-foreground text-xs uppercase tracking-wide">{label}</span>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  </div>
)

const ComprovanteAgendamento = ({
  usuario,
  assistencia,
  dataEmissao,
  horaEmissao,
}: ComprovanteProps) => {
  const pdfRef = useRef<HTMLDivElement | null>(null)

  // ------------------------------
  // Função para gerar PDF no front-end
  // ------------------------------
  const gerarPDF = async () => {
    if (!pdfRef.current) return

    const element = pdfRef.current

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    })

    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

    pdf.save('comprovante-agendamento.pdf')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-300 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Botão de imprimir ou salvar PDF */}
        <div className="animate-fade-in mb-6 flex justify-end gap-3">
          <button className="gap-2">
            <Printer className="size-4" />
            Baixar PDF
          </button>
        </div>

        {/* Container capturado para PDF */}
        <div ref={pdfRef} className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* HEADER */}
          <div className="relative bg-green-700 px-6 py-8 text-center text-white">
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-xl bg-white/20">
                  <Building2 className="size-8 text-white" />
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-bold tracking-wide">PREFEITURA DE</h2>
                  <h1 className="text-3xl font-bold">MASSAPÊ</h1>
                  <p className="text-sm text-white/80">Gestão diferente e eficiente</p>
                </div>
              </div>

              <div className="rounded-xl bg-white/20 px-6 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="size-6 text-white" />
                  <h3 className="text-xl font-bold tracking-wider">COMPROVANTE DE AGENDAMENTO</h3>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="space-y-6 p-6">
            {/* Usuário */}
            <section className="rounded-xl border bg-gray-100 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-green-200">
                  <User className="size-5 text-green-800" />
                </div>
                <h4 className="text-lg font-semibold">Informações do Usuário</h4>
              </div>
              <div className="grid gap-3">
                <InfoRow icon={User} label="Nome do Cidadão" value={usuario.nome} />
                <InfoRow icon={FileText} label="CPF do Cidadão" value={usuario.cpf} />
                <InfoRow icon={MapPin} label="Localização" value={usuario.localizacao} />
              </div>
            </section>

            {/* Assistência */}
            <section className="rounded-xl border bg-gray-100 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-green-200">
                  <Building2 className="size-5 text-green-800" />
                </div>
                <h4 className="text-lg font-semibold">Informações da Assistência</h4>
              </div>
              <div className="grid gap-3">
                <InfoRow icon={Building2} label="Nome da Assistência" value={assistencia.nome} />
                <InfoRow icon={FileText} label="Serviço Solicitado" value={assistencia.servico} />
                <InfoRow icon={MapPin} label="Localização" value={assistencia.localizacao} />

                <div className="flex flex-wrap gap-6">
                  <InfoRow icon={Calendar} label="Data" value={assistencia.dataAgendamento} />
                  <InfoRow icon={Clock} label="Horário" value={assistencia.horaAgendamento} />
                </div>
              </div>
            </section>

            {/* Confirmação */}
            <div className="rounded-xl border bg-green-100 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Calendar className="size-5" />
                <span className="font-semibold">Agendamento confirmado para</span>
              </div>
              <p className="mt-2 text-2xl font-bold">
                {assistencia.dataAgendamento} às {assistencia.horaAgendamento}
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="border-t bg-gray-100 px-6 py-5">
            <div className="mb-4 flex justify-between text-sm text-gray-600">
              <span>
                Emitido em {dataEmissao} às {horaEmissao}
              </span>
              <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs">#AGD-2025</span>
            </div>

            <p className="text-sm leading-relaxed">
              <strong className="text-green-700">Este documento possui natureza oficial</strong> e
              garante que o(a) solicitante possui atendimento previamente agendado na
              <strong> Prefeitura Municipal de Massapê</strong>.
            </p>

            <p className="mt-4 text-center text-sm font-medium text-gray-700">
              Assistência Social na Palma da Mão
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComprovanteAgendamento
