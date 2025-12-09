// utils/gerarComprovante.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { converterCoresOKLCHparaRGB } from './fixColors'

export async function gerarComprovante({
  nome,
  dataAtendimento,
  cpf,
  solicitacao,
  assistencia,
  servico,
  hora,
  dataCriacao,
  dataNascimento
}: {
  nome: string
  dataAtendimento?: string
  cpf: string
  solicitacao: any
  assistencia: string
  servico: string
  hora: string
  dataCriacao: string
  dataNascimento: string
}) {
  const container = document.createElement('div')

  // Primeiro, elimina qualquer estilo global
  container.style.cssText = `
  all: unset;
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 800px;
  padding: 20px;
  background: white;
  font-family: Arial;
  z-index: -1;
`

  document.body.appendChild(container)

  // DEFINE APENAS O NECESSÁRIO
  container.style.position = 'fixed'
  container.style.top = '-9999px'
  container.style.left = '-9999px'
  container.style.width = '800px'
  container.style.padding = '20px'
  container.style.background = 'white'
  container.style.fontFamily = 'Arial'
  container.style.zIndex = '-1'

  document.body.appendChild(container)

  container.innerHTML = `
    <div style="
      font-family: Arial; 
      width: 100%; 
      padding: 24px; 
      border-radius: 16px; 
      background: #ffffff;
      color: #333;
      border: 1px solid #e5e5e5;
    ">
      <h1 style="text-align: center; color:#0f5f2a; margin-bottom: 10px;">
        Prefeitura de Massapê
      </h1>
      <h2 style="text-align:center; margin:0; font-size: 20px;">
        Comprovante de Agendamento
      </h2>

      <hr style="margin: 16px 0;">

      <h3 style="color:#0f5f2a;">Informações do Usuário</h3>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Data de nascimento:</strong> ${dataNascimento}</p>

      <h3 style="color:#0f5f2a; margin-top:20px;">Informações da Assistência</h3>
      <p><strong>Assistência:</strong> ${assistencia}</p>
      <p><strong>Serviço:</strong> ${servico}</p>
      <p><strong>Data:</strong> ${solicitacao.data}</p>
      <p><strong>Observação:</strong> ${
        solicitacao.observacoesFuncionario || 'Nenhuma observação'
      }</p>

      <div style="
        margin-top: 24px; 
        padding: 12px; 
        background:#e3f8e5; 
        border-left: 4px solid #0f5f2a;
      ">
        Documento gerado automaticamente – válido como comprovante.
      </div>
    </div>
  `

  // CONVERTE CORES RESTANTES
  converterCoresOKLCHparaRGB(container)

  const canvas = await html2canvas(container, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('comprovante-agendamento.pdf')
  
  let y = pdfHeight + 10
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
  pdf.text(`${dataAtendimento} às ${hora}`, 105, y + 15, { align: 'center' })

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
