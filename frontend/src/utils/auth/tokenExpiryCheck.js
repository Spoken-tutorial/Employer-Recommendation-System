export function isTokenExpired(expirationTime) {
  const expirationTimeInMilliseconds = expirationTime * 1000;
  const currentTime = Date.now();
  return expirationTimeInMilliseconds < currentTime;
}
