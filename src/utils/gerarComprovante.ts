import jsPDF from "jspdf";
import { maskCPF } from "./mask-CPF-Sensitive";

export function gerarComprovante({
    nome,
    dataNascimento,
    cpf,
    solicitacao,
    assistencia,
    servico,
}: {
    nome: string;
    dataNascimento: string;
    cpf: string;
    solicitacao: any;
    assistencia: string;
    servico: string;
}) {
    // Calcular idade a partir da data de nascimento
    const calcularIdade = (dataNasc: string) => {
        const hoje = new Date();
        const nascimento = new Date(dataNasc);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };
    
    const idade = calcularIdade(dataNascimento);
    const pdf = new jsPDF();
    
    const maskedCpf = maskCPF(cpf);
    const dataCriacao = new Date(solicitacao.dataCriacao).toLocaleDateString("pt-BR");
    const dataAtendimento = solicitacao.data
        ? new Date(solicitacao.data).toLocaleDateString("pt-BR")
        : "Não informado";

    // Cores
    const primaryColor: [number, number, number] = [25, 74, 153]; // #194a99
    const secondaryColor: [number, number, number] = [52, 73, 94]; // Cinza escuro
    const lightGray: [number, number, number] = [236, 240, 241];
    const white: [number, number, number] = [255, 255, 255];

    // Cabeçalho com fundo colorido
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, 210, 40, "F");
    
    // Título
    pdf.setTextColor(...white);
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(24);
    pdf.text("COMPROVANTE DE AGENDAMENTO", 105, 20, { align: "center" });
    
    pdf.setFontSize(12);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Guarde este comprovante para sua consulta", 105, 30, { align: "center" });

    // Reset cor do texto
    pdf.setTextColor(...secondaryColor);

    let y = 55;

    // Função para criar seções com background
    const createSection = (title: string, yPos: number) => {
        pdf.setFillColor(...lightGray);
        pdf.rect(15, yPos - 7, 180, 10, "F");
        pdf.setFont("Helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(...primaryColor);
        pdf.text(title, 20, yPos);
        pdf.setTextColor(...secondaryColor);
        return yPos + 12;
    };

    // Função para adicionar linhas de informação
    const addInfoLine = (label: string, value: string | number, yPos: number) => {
        pdf.setFont("Helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text(label, 20, yPos);
        pdf.setFont("Helvetica", "normal");
        pdf.setFontSize(11);
        pdf.text(String(value), 80, yPos);
        return yPos + 8;
    };

    // Seção: Informações do Usuário
    y = createSection("INFORMAÇÕES DO USUÁRIO", y);
    y = addInfoLine("Nome:", nome, y);
    y = addInfoLine("Idade:", `${idade} anos`, y);
    y = addInfoLine("CPF:", maskedCpf, y);
    
    y += 8;

    // Seção: Atendimento
    y = createSection("ATENDIMENTO", y);
    y = addInfoLine("Assistência:", assistencia, y);
    y = addInfoLine("Serviço:", servico, y);
    
    y += 8;

    // Seção: Dados da Solicitação
    y = createSection("DADOS DA SOLICITAÇÃO", y);
    y = addInfoLine("Protocolo:", solicitacao.protocolo, y);
    y = addInfoLine("Criado em:", dataCriacao, y);
    y = addInfoLine("Data Agendada:", dataAtendimento, y);
    
    // Observação do Funcionário (pode ser mais longo)
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text("Observação do Funcionário:", 20, y);
    pdf.setFont("Helvetica", "normal");
    const observacao = solicitacao.observacoes ?? "Nenhuma";
    const splitObservacao = pdf.splitTextToSize(observacao, 110);
    pdf.text(splitObservacao, 20, y + 8);
    y += 8 + (splitObservacao.length * 6);

    // Rodapé
    y = Math.max(y + 15, 260);
    pdf.setFillColor(...lightGray);
    pdf.rect(0, y, 210, 30, "F");
    pdf.setFont("Helvetica", "italic");
    pdf.setFontSize(9);
    pdf.setTextColor(...secondaryColor);
    pdf.text("Este é um documento oficial de agendamento.", 105, y + 10, { align: "center" });
    pdf.text("Em caso de dúvidas, entre em contato com nossa central de atendimento.", 105, y + 16, { align: "center" });
    pdf.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 105, y + 22, { align: "center" });

    // Borda decorativa
    pdf.setDrawColor(...primaryColor);
    pdf.setLineWidth(1);
    pdf.rect(10, 45, 190, y - 40);

    pdf.save(`comprovante-${solicitacao.protocolo}.pdf`);
}
