import { normalizarTexto } from "./normalizarTexto"
import { numeroParaRomano } from "./numeroParaRomano"


function extrairNumeroDaBusca(busca: string): number | null {
  const match = busca.match(/\b(\d+)\b$/)
  return match ? Number(match[1]) : null
}

function matchComNumero(
  unidade: string,
  busca: string,
  numero: number
): boolean {
  const romano = numeroParaRomano(numero)
  if (!romano) return false

  const textoBase = busca.replace(/\b\d+\b$/, '').trim()
  const regex = new RegExp(`\\b${textoBase}\\s+${romano}\\b`)

  return regex.test(unidade)
}

export function matchInstituicao(
  unidadeOriginal: string,
  buscaOriginal: string
): boolean {
  const unidade = normalizarTexto(unidadeOriginal)
  const busca = normalizarTexto(buscaOriginal)

  if (!busca) return true

  const numero = extrairNumeroDaBusca(busca)

  if (numero !== null) {
    return matchComNumero(unidade, busca, numero)
  }

  return unidade.includes(busca)
}
