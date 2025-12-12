import ExcelJS from "exceljs";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export async function gerarRelatorio(dados: any, mes: string) {
  const { assistencia, status, servicosSolicitados, user } = dados;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Relatório");

  sheet.addRow(["Relatório da Unidade"]);
  sheet.addRow([assistencia.unidade]);
  sheet.addRow([]);

  sheet.addRow(["Status"]);
  sheet.addRow(["Pendentes", status.pendentes]);
  sheet.addRow(["Aprovados", status.aprovados]);
  sheet.addRow(["Recusados", status.recusados]);
  sheet.addRow([]);

  sheet.addRow(["Serviços Solicitados"]);
  servicosSolicitados.forEach((s: any) =>
    sheet.addRow([s.nome, s.quantidade])
  );

  sheet.addRow([]);
  sheet.addRow([`Gerado por ${user.nome} (${user.papel})`]);

  // -------------------------------
  // GERAR CANVAS DO GRÁFICO
  // -------------------------------
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;

  const ctx = canvas.getContext("2d");

  const chart = new Chart(ctx!, {
    type: "pie",
    data: {
      labels: ["Pendentes", "Aprovados", "Recusados"],
      datasets: [
        {
          data: [
            status.pendentes,
            status.aprovados,
            status.recusados,
          ],
        },
      ],
    },
    options: {
      animation: true,
    },
  });

  // Aguarda renderização ASYNC
  await chart.update();

  // ⚠ Garantir delay mínimo
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Converter para Base64 sem cabeçalho
  const base64 = canvas
    .toDataURL("image/png")
    .replace(/^data:image\/png;base64,/, "");

  // -------------------------------
  // INSERIR IMAGEM NO EXCEL
  // -------------------------------
  const imageId = workbook.addImage({
    base64,
    extension: "png",
  });

  sheet.addImage(imageId, {
    tl: { col: 4, row: 1 },
    ext: { width: 280, height: 280 },
  });

  // -------------------------------
  // GERAR DOWNLOAD
  // -------------------------------
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `relatorio-${mes}-${assistencia.unidade}.xlsx`;
  a.click();

  URL.revokeObjectURL(url);
}
