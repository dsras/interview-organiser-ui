import { Injectable } from '@angular/core';
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
  constructor(private _requester: Requester) {}

  login(user: IUser): Observable<any> {
    return this._requester.postRequestNoAuth(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.LOGIN, user);
  }
}
