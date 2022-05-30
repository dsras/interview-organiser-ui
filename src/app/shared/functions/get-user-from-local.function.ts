import { AppRoles, UserData } from '../models/types';

export function getUsername(): string {
  return JSON.parse('' + localStorage.getItem('userData')).username;
}

export function getUserRoles(): Array<AppRoles> {
  return JSON.parse('' + localStorage.getItem('userData')).roles;
}

export function getUserData(): UserData {
  return JSON.parse('' + localStorage.getItem('userData'));
}
