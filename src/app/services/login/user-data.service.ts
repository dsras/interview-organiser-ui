import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/shared/models/types';
import { RequestCenterService } from '../requester/request-center.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // loggedInObject: BehaviorSubject<LoggedInObject> = new BehaviorSubject()
  currentUser: BehaviorSubject<string> = new BehaviorSubject('');

  userData: BehaviorSubject<UserData | undefined> = new 
    BehaviorSubject<UserData | undefined>(undefined);

  constructor(private requester: RequestCenterService) {}

  getUserData() {
    this.requester.getUserData(this.currentUser.value)
  }
}
