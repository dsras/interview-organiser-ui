import { DatePipe } from '@angular/common';

export class DateToString {
  constructor(private pipe: DatePipe) {}

  dateToStringTime(date: Date): string {
    return '' + this.pipe.transform(date, 'HH:mm');
  }

  dateToStringDate(date: Date): string {
    return '' + this.pipe.transform(date, 'yyyy-MM-dd');
  }
}
