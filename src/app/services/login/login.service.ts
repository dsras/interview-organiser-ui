import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { IUser } from 'src/app/shared/models/user-model';
import { Requester } from '../requester/requester.service';
import { RoleViewService } from '../role-view.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _requester: Requester, private _roleView: RoleViewService) {}

  login(user: IUser): Observable<any> {
    return this._requester.postRequestNoAuth(
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.LOGIN,
      user
    );
  }

  updateView(roles: string[]): void {
    switch (true) {
      case roles.includes('RECRUITER'):
        this._roleView.changeView('RECRUITER');
        break;
      case roles.includes('USER'):
        this._roleView.changeView('USER');
        break;
      case roles.includes('ADMIN'):
        this._roleView.changeView('ADMIN');
        break;
      default:
        break;
    }
  }
}
