export function maskCPF(cpf: string) {
  return cpf.replace(/(\d{3})\.\d{1}\d{2}\.\d{3}\-(\d{2})/, '000.0***-**')
}
