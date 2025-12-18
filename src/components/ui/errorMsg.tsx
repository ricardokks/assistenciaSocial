export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null
  return <span className="mt-1 text-sm text-red-500">{message}</span>
}
