export function encodeBase64UrlSafe(input: string) {
  return btoa(encodeURIComponent(JSON.stringify(input)));
}

export function decodeBase64UrlSafe<T>(input: string): T {
  return JSON.parse(decodeURIComponent(atob(input)));
}
