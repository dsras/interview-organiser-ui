import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class OverviewUpdaterService {
  private updateEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getEmitter(): EventEmitter<any> {
    return this.updateEvent;
  }
  updateOverview(): void{
    this.updateEvent.emit();
  }
}
