// utils/gerarComprovante.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { converterCoresOKLCHparaRGB } from './fixColors'

export async function gerarComprovante({
  nome,
  dataNascimento,
  cpf,
  solicitacao,
  assistencia,
  servico,
}: {
  nome: string
  dataNascimento: string | number
  cpf: string
  solicitacao: any
  assistencia: string
  servico: string
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

  document.body.removeChild(container)
}
