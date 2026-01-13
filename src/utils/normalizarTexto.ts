export function normalizarTexto(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function normalizarNumero(texto: string) {
  return texto.replace(/\D/g, '')
}
