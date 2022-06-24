import { Injectable } from '@angular/core';
import { AppRoles, UserData } from '../shared/models/types';
import { ISSOUser } from '../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor() { }


  getUsername(): string {
    return JSON.parse('' + localStorage.getItem('ssoUser')).email;
  }
  
  getUserRoles(): Array<AppRoles> {
    return JSON.parse('' + localStorage.getItem('userData')).roles;
  }
  
  getUserRoleNames(): Array<string> {
    const userRoles: Array<AppRoles> = this.getUserRoles();
    let roles: Array<string> = [];
    userRoles.forEach((role) => {
      roles.push(role.name);
    });
    return roles;
  }
  
  getUserData(): UserData {
    return JSON.parse('' + localStorage.getItem('userData'));
  }

  getSSOUser(): ISSOUser {
    return JSON.parse(''+ localStorage.getItem('ssoUser'))
  }
  
}
