export interface IUser {
  username: string;
  password: string;
}

export interface ISystemUser {
  id: number;
  name: string;
}

export class LoggedInObject implements IUser {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class LoginUser implements IUser {
  username: string;
  password: string;
  type?: string;

  constructor(username: string, password: string, type?: string) {
    this.username = username;
    this.password = password;
    this.type = type;
  }
}

export interface SSOUser {
  authToken: string;
  email: string;
  firstName: string;
  id: string;
  idToken: string;
  lastName: string;
  name: string;
  photoUrl: string;
  provider: string;
}
