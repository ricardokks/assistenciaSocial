import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { 
  User, Building2, MapPin, Calendar, Clock, FileText, Printer, CheckCircle 
} from "lucide-react";


interface DadosUsuario {
  nome: string;
  cpf: string;
  localizacao: string;
}

interface DadosAssistencia {
  nome: string;
  servico: string;
  localizacao: string;
  dataAgendamento: string;
  horaAgendamento: string;
}

interface ComprovanteProps {
  usuario: DadosUsuario;
  assistencia: DadosAssistencia;
  dataEmissao: string;
  horaEmissao: string;
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
    <div>
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  </div>
);

const ComprovanteAgendamento = ({
  usuario,
  assistencia,
  dataEmissao,
  horaEmissao
}: ComprovanteProps) => {

  const pdfRef = useRef<HTMLDivElement | null>(null);

  // ------------------------------
  // Função para gerar PDF no front-end
  // ------------------------------
  const gerarPDF = async () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("comprovante-agendamento.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-green-300 py-8 px-4">

      <div className="max-w-2xl mx-auto">

        {/* Botão de imprimir ou salvar PDF */}
        <div className="flex justify-end gap-3 mb-6 animate-fade-in">
          <button className="gap-2">
            <Printer className="w-4 h-4" />
            Baixar PDF
          </button>
        </div>

        {/* Container capturado para PDF */}
        <div ref={pdfRef} className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-green-700 px-6 py-8 text-center text-white relative">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-bold tracking-wide">PREFEITURA DE</h2>
                  <h1 className="text-3xl font-bold">MASSAPÊ</h1>
                  <p className="text-white/80 text-sm">Gestão diferente e eficiente</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl py-3 px-6">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold tracking-wider">
                    COMPROVANTE DE AGENDAMENTO
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="p-6 space-y-6">
            {/* Usuário */}
            <section className="bg-gray-100 rounded-xl p-5 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-green-800" />
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
            <section className="bg-gray-100 rounded-xl p-5 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-800" />
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
            <div className="bg-green-100 rounded-xl p-4 border text-center">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Agendamento confirmado para</span>
              </div>
              <p className="text-2xl font-bold mt-2">
                {assistencia.dataAgendamento} às {assistencia.horaAgendamento}
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="bg-gray-100 px-6 py-5 border-t">
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Emitido em {dataEmissao} às {horaEmissao}</span>
              <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                #AGD-2025
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              <strong className="text-green-700">Este documento possui natureza oficial</strong> e garante
              que o(a) solicitante possui atendimento previamente agendado na 
              <strong> Prefeitura Municipal de Massapê</strong>.
            </p>

            <p className="text-center text-sm font-medium text-gray-700 mt-4">
              Assistência Social na Palma da Mão
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ComprovanteAgendamento;
