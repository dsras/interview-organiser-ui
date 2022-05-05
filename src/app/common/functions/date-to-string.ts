import { DatePipe } from '@angular/common';

// ! This should probably be refactored into a service
export class DateToString {
  constructor(private pipe: DatePipe) {}

  dateToStringTime(date: Date): string {
    return '' + this.pipe.transform(date, 'HH:mm');
  }

  dateToStringDate(date: Date): string {
    return '' + this.pipe.transform(date, 'yyyy-MM-dd');
  }
}
