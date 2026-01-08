const mapaRomanos: Record<number, string> = {
  1: 'i',
  2: 'ii',
  3: 'iii',
  4: 'iv',
  5: 'v',
  6: 'vi',
  7: 'vii',
  8: 'viii',
  9: 'ix',
  10: 'x',
}

export function numeroParaRomano(numero: number): string | null {
  return mapaRomanos[numero] ?? null
}
