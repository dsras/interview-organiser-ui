import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../shared/models/user-model';
import { APPCONSTANTS } from '../shared/constants/app.constant';
import { Requester } from './requester/requester.service';

export interface IBackendService {
  login(user: IUser): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService implements IBackendService {
  constructor(private _httpClient: HttpClient, private _requester: Requester) {}

  login(user: IUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._httpClient.post(
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.LOGIN,
      user,
      httpOptions
    );
  }

  getRequestHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('apiKey'),
    });
  }

  getUserRole(user: IUser): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._httpClient.get(
      APPCONSTANTS.APICONSTANTS.BASE_URL +
        APPCONSTANTS.APICONSTANTS.USER_FIND +
        '?username=' +
        user.username,
      httpOptions
    );
  }
}
