import jsPDF from 'jspdf'

export async function gerarComprovante({
  nome,
  dataNascimento,
  cpf,
  solicitacao,
  assistencia,
  servico,
  hora,
  dataAtendimento,
  dataCriacao,
}: {
  nome: string
  dataNascimento: string | number
  cpf: string
  solicitacao: any
  assistencia: string
  servico: string
  hora: string
  dataAtendimento?: string
  dataCriacao: string
}) {
  const pdf = new jsPDF('p', 'mm', 'a4')

  const pageWidth = pdf.internal.pageSize.getWidth()
  const margin = 20
  let y = 0

  // Azul institucional
  const AZUL = [30, 64, 175] as const

  // =============================
  // HEADER AZUL
  // =============================
  pdf.setFillColor(...AZUL)
  pdf.rect(0, 0, pageWidth, 36, 'F')

  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.setTextColor(255, 255, 255)
  pdf.text('Prefeitura de Massapê', pageWidth / 2, 18, {
    align: 'center',
  })

  pdf.setFontSize(14)
  pdf.text('Comprovante de Agendamento', pageWidth / 2, 26, {
    align: 'center',
  })

  // =============================
  // CARD PRINCIPAL
  // =============================
  y = 45

  pdf.setFillColor(255, 255, 255)
  pdf.setDrawColor(220, 220, 220)
  pdf.roundedRect(margin, y, pageWidth - margin * 2, 235, 6, 6, 'FD')

  y += 15

  // =============================
  // INFORMAÇÕES DO USUÁRIO
  // =============================
  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.setTextColor(...AZUL) // AZUL
  pdf.text('Informações do Usuário', margin + 5, y)

  y += 7
  pdf.setFont('Helvetica', 'normal')
  pdf.setFontSize(11)
  pdf.setTextColor(...AZUL)

  pdf.text(`Nome: ${nome}`, margin + 5, y)
  y += 6
  pdf.text(`CPF: ${cpf}`, margin + 5, y)
  y += 6
  pdf.text(`Data de nascimento: ${dataNascimento}`, margin + 5, y)

  y += 10

  // =============================
  // INFORMAÇÕES DA ASSISTÊNCIA
  // =============================
  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.setTextColor(...AZUL) // AZUL
  pdf.text('Informações da Assistência', margin + 5, y)

  y += 7
  pdf.setFont('Helvetica', 'normal')
  pdf.setTextColor(...AZUL)

  pdf.text(`Assistência: ${assistencia}`, margin + 5, y)
  y += 6
  pdf.text(`Serviço: ${servico}`, margin + 5, y)
  y += 6
  pdf.text(`Data: ${dataAtendimento}`, margin + 5, y)

  y += 6
  const obs = solicitacao.observacoesFuncionario || 'Nenhuma observação'
  const obsSplit = pdf.splitTextToSize(`Observação: ${obs}`, pageWidth - margin * 2 - 10)
  pdf.text(obsSplit, margin + 5, y)
  y += obsSplit.length * 6 + 8

  // =============================
  // AVISO AZUL CLARO
  // =============================
  pdf.setFillColor(230, 235, 255)
  pdf.rect(margin + 5, y, pageWidth - margin * 2 - 10, 14, 'F')

  pdf.setDrawColor(...AZUL)
  pdf.setLineWidth(1)
  pdf.line(margin + 5, y, margin + 5, y + 14)

  pdf.setFontSize(10)
  pdf.setTextColor(...AZUL)
  pdf.text('Documento gerado automaticamente – válido como comprovante.', margin + 10, y + 9)

  y += 25

  // =============================
  // DESTAQUE DO AGENDAMENTO
  // =============================
  pdf.setFillColor(220, 230, 255)
  pdf.roundedRect(margin, y, pageWidth - margin * 2, 18, 4, 4, 'F')

  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.setTextColor(...AZUL)
  pdf.text('Agendamento confirmado para', pageWidth / 2, y + 7, { align: 'center' })

  pdf.setFontSize(16)
  pdf.text(`${dataAtendimento} às ${hora}h`, pageWidth / 2, y + 14, { align: 'center' })

  y += 30

 // =============================
// RODAPÉ
// =============================
y += 10 // <-- espaçamento extra (equivalente a padding-top)

pdf.setFontSize(9)
pdf.setTextColor(...AZUL)
pdf.text(`Documento emitido em ${dataCriacao}`, margin, y)

y += 8 // <-- mais espaço entre linhas
const rodape =
  'Este documento possui natureza oficial e certifica que o(a) solicitante possui ' +
  'atendimento de Assistência Social previamente agendado junto à Prefeitura Municipal de Massapê.'

const rodapeSplit = pdf.splitTextToSize(rodape, pageWidth - margin * 2)
pdf.text(rodapeSplit, margin, y)

y += rodapeSplit.length * 6 + 8
pdf.text('Assistência Social na Palma da Mão', pageWidth / 2, y, { align: 'center' })


  // =============================
  // SALVAR
  // =============================
  pdf.save(`comprovante-${solicitacao.protocolo}.pdf`)
}
