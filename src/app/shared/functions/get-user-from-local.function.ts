export function getUsername(): string {
    return JSON.parse('' + localStorage.getItem('userdata')).username
}