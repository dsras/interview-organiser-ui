import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarUpdaterService {
  private updateEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getEmitter(): EventEmitter<any> {
    return this.updateEvent;
  }

  updateCalendar(): void {
    this.updateEvent.emit();
  }
}
