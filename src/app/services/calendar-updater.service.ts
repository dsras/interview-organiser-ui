import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarUpdaterService {

  private updateMessage = new BehaviorSubject('');
  currentUpdateMessage = this.updateMessage.asObservable();
  
  constructor() { }

  update(message: string) {
    this.updateMessage.next(message)
    }
}
