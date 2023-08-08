export function getExpirationDate (ms: number) {
  return new Date(Date.now() + ms)
}

export function isExpired (expires: string | number | Date) {
  if (!expires) { return false }
  return new Date(expires) <= new Date()
}
