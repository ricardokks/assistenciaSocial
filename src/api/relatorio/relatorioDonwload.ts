import { api } from "../../lib/axios.config";

export async function relatorionDownload(id: string) {
  try {
    const response = await api.get(`/assistencia/report/download/${id}`, {
      responseType: "arraybuffer",
    });

    console.log("rodou dps")
    // --------------------------------
    // 1) Ler o header Content-Disposition CORRETAMENTE
    // --------------------------------
    let fileName = `relatorio-${id}.xlsx`;

    const contentDisposition = response.headers["content-disposition"];
          console.log("mathc: ", contentDisposition)
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        fileName = match[1];      // <-- NOME CORRETO AQUI
      }
    }

    console.log("rodou dps 1")
    // --------------------------------
    // 2) Criar Blob com os dados
    // --------------------------------
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // --------------------------------
    // 3) Forçar download
    // --------------------------------
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;   // <-- AQUI O NOME CERTO
    a.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Erro ao baixar relatório", err);
    throw err;
  }
}
