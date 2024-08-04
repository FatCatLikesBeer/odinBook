export function queryToURLEncoded(queryParameters: any) {
  let result = Object.entries(queryParameters)
    .map(([key, value]) => { return `${encodeURIComponent(String(key))}=${encodeURIComponent(String(value))}` })
    .join('&');
  result = "/?" + result;
  return result;
}
