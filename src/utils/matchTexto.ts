import { normalizarTexto } from "./normalizarTexto"

export function matchTexto(
  textoOriginal: string,
  buscaOriginal: string
): boolean {
  const texto = normalizarTexto(textoOriginal)
  const busca = normalizarTexto(buscaOriginal)

  if (!busca) return true

  return texto.includes(busca)
}
