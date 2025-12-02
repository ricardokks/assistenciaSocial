import jsPDF from 'jspdf'

import { maskCPF } from './mask-CPF-Sensitive'

export function gerarComprovante({
  nome,
  dataNascimento,
  cpf,
  solicitacao,
  assistencia,
  servico,
}: {
  nome: string
  dataNascimento: string
  cpf: string
  solicitacao: any
  assistencia: string
  servico: string
}) {
  const pdf = new jsPDF()

  const calcularIdade = (dn: string) => {
    const hoje = new Date()
    const nasc = new Date(dn)
    let idade = hoje.getFullYear() - nasc.getFullYear()
    const m = hoje.getMonth() - nasc.getMonth()
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--
    return idade
  }

  const idade = calcularIdade(dataNascimento)
  const maskedCpf = maskCPF(cpf)
  const dataCriacao = new Date(solicitacao.dataCriacao).toLocaleDateString('pt-BR')
  const dataAtendimento = solicitacao.data
    ? new Date(solicitacao.data).toLocaleDateString('pt-BR')
    : 'Não informado'

  // -------------------------------------
  // CORES DO DESIGN
  // -------------------------------------
  const blue1 = [0, 110, 255]
  const blue2 = [10, 80, 200]
  const green = [40, 185, 120]
  const grayText = [70, 70, 70]
  const lightGray = [245, 245, 245]
  const white = [255, 255, 255]

  // -------------------------------------
  // FUNDO SUPERIOR — DEGRADÊ AZUL
  // -------------------------------------
  for (let i = 0; i < 80; i++) {
    const r = blue1[0] + ((blue2[0] - blue1[0]) * i) / 80
    const g = blue1[1] + ((blue2[1] - blue1[1]) * i) / 80
    const b = blue1[2] + ((blue2[2] - blue1[2]) * i) / 80
    pdf.setFillColor(r, g, b)
    pdf.rect(0, i, 210, 1, 'F')
  }

  // -------------------------------------
  // CABEÇALHO
  // -------------------------------------
  pdf.setTextColor(...white)
  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(22)
  pdf.text('PREFEITURA DE', 105, 22, { align: 'center' })
  pdf.setFontSize(28)
  pdf.text('MASSAPÊ', 105, 32, { align: 'center' })

  pdf.setFont('Helvetica', 'normal')
  pdf.setFontSize(12)
  pdf.text('Gestão diferente e eficiente', 105, 40, { align: 'center' })

  // Botão “Comprovante de Agendamento”
  pdf.setFillColor(255, 255, 255)
  pdf.roundedRect(35, 50, 140, 12, 3, 3, 'F')
  pdf.setTextColor(blue2[0], blue2[1], blue2[2])
  pdf.setFontSize(12)
  pdf.setFont('Helvetica', 'bold')
  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.text('COMPROVANTE DE AGENDAMENTO', 105, 58, { align: 'center' })

  let y = 75

  // -------------------------------------
  // FUNÇÃO PARA CARTÕES
  // -------------------------------------
  const card = (title: string, startY: number, color: number[]) => {
    pdf.setFillColor(...lightGray)
    pdf.roundedRect(15, startY, 180, 8, 3, 3, 'F')
    pdf.setFont('Helvetica', 'bold')
    pdf.setFontSize(13)
    pdf.setTextColor(...color)
    pdf.text(title, 20, startY + 5)
    pdf.setTextColor(...grayText)
    return startY + 18
  }

  // -------------------------------------
  // FUNÇÃO DE LINHAS
  // -------------------------------------
  const info = (label: string, value: string | number, Y: number) => {
    pdf.setFontSize(11)
    pdf.setFont('Helvetica', 'bold')
    pdf.text(label, 20, Y)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(String(value), 80, Y)
    return Y + 8
  }

  // -------------------------------------
  // CARTÃO: INFORMAÇÕES DO USUÁRIO
  // -------------------------------------
  y = card('Informações do Usuário', y, blue2)
  y = info('Nome do Cidadão:', nome, y)
  y = info('CPF do Cidadão:', maskedCpf, y)
  y = info('Idade:', `${idade} anos`, y)
  y = info('Localização:', 'Massapê - Ceará - Brasil', y)

  y += 10

  // -------------------------------------
  // CARTÃO: ASSISTÊNCIA
  // -------------------------------------
  y = card('Informações da Assistência', y, green)
  y = info('Nome da Assistência:', assistencia, y)
  y = info('Serviço Solicitado:', servico, y)
  y = info('Localização:', 'Massapê, Ceará', y)
  y = info('Data:', dataAtendimento, y)
  y = info('Horário:', '17:00', y)

  y += 10

  // -------------------------------------
  // GRANDE DESTAQUE DA DATA
  // -------------------------------------
  pdf.setFillColor(255, 244, 200)
  pdf.roundedRect(20, y, 170, 18, 4, 4, 'F')
  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(14)
  pdf.setTextColor(0, 0, 0)
  pdf.text('Agendamento confirmado para', 105, y + 7, { align: 'center' })
  pdf.setFontSize(18)
  pdf.text(`${dataAtendimento} às 17:00`, 105, y + 15, { align: 'center' })

  y += 30

  // -------------------------------------
  // RODAPÉ OFICIAL
  // -------------------------------------
  pdf.setFontSize(10)
  pdf.setTextColor(90, 90, 90)
  pdf.text(`Documento emitido em ${dataCriacao}`, 20, y)

  pdf.setFontSize(9)
  const textoRodape =
    'Este documento possui natureza oficial e certifica que o(a) solicitante possui atendimento ' +
    'de Assistência Social previamente agendado junto à Prefeitura Municipal de Massapê.'

  const split = pdf.splitTextToSize(textoRodape, 170)
  pdf.text(split, 20, y + 10)

  pdf.setFontSize(9)
  pdf.text('Assistência Social na Palma da Mão', 105, y + 28, { align: 'center' })

  // -------------------------------------
  // SALVAR
  // -------------------------------------
  pdf.save(`comprovante-${solicitacao.protocolo}.pdf`)
}
