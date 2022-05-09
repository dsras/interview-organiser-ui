import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../shared/models/user-model';
import { APPCONSTANTS } from '../shared/constants/app.constant';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
}
