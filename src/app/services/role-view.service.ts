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
}
