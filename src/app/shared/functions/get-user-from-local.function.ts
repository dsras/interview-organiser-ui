export function getUsername(): string {
  return JSON.parse('' + localStorage.getItem('userData')).username;
}
