import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { IUser } from 'src/app/shared/models/user-model';
import { Requester } from '../requester/requester.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _requester: Requester) {}

  login(user: IUser): Observable<any> {
    return this._requester.postRequestNoAuth(
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.LOGIN,
      user
    );
  }
}
