export function getExpirationDate (ms) {
  return new Date(Date.now() + ms)
}

export function isExpired (expires) {
  if (!expires) { return false }
  return new Date(expires) <= new Date()
}
