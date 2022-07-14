import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleViewService {
  VIEWOPTIONS: string[] = ['USER', 'RECRUITER', 'ADMIN'];

  private currentView: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  getCurrentView(): BehaviorSubject<string> {
    return this.currentView;
  }
  changeView(view: string): void {
    if (this.VIEWOPTIONS.includes(view)) {
      this.currentView.next(view);
      console.log(this.currentView.getValue())
    }
  }
  
  defaultView(roles: string[]): void {
    switch (true) {
      case roles.includes('RECRUITER'):
        this.changeView('RECRUITER');
        break;
      case roles.includes('USER'):
        this.changeView('USER');
        break;
      case roles.includes('ADMIN'):
        this.changeView('ADMIN');
        break;
      default:
        break;
    }
  }
}