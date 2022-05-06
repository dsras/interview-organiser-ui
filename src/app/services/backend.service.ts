import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../common/models/user-model';
import { APPCONSTANTS } from '../common/constants/app.constant';

export interface IBackendService {
  login(user: IUser): Observable<any>;
  getPositions(): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService implements IBackendService {
  constructor(private _httpClient: HttpClient) {}

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
  getPositions(): Observable<any> {
    return this._httpClient.get(
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.POSITIONS,
      { headers: this.getRequestHeader() }
    );
  }
}
