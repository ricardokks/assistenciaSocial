import { normalizarNumero, normalizarTexto } from "./normalizarTexto"


export function matchUsuario(
  usuario: { nome: string; cpf: string },
  busca: string
) {
  const buscaTexto = normalizarTexto(busca)
  const buscaNumero = normalizarNumero(busca)

  const nome = normalizarTexto(usuario.nome)
  const cpf = normalizarNumero(usuario.cpf)

  if (!busca) return true

  return (
    nome.includes(buscaTexto) ||
    cpf.includes(buscaNumero)
  )
}
