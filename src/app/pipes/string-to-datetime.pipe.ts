import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDatetime',
})
export class StringToDatetimePipe implements PipeTransform {
  transform(timeString: string): Date {
    let returnDate = new Date();
    let timeArray = timeString.split(':');
    returnDate.setHours(parseInt(timeArray[0]), parseInt(timeArray[1]));
    return returnDate;
  }
}
