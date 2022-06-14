import { Pipe, PipeTransform } from '@angular/core';
import { timeout } from 'rxjs';

@Pipe({
  name: 'DateToTimePipe',
})
export class DateToTimePipe implements PipeTransform {
  transform(dateInput: Date){
    let timeOut = '';
    let h = dateInput.getHours();
    let m = dateInput.getMinutes();

    timeOut+=(h<10?'0'+h:h)+':';
    timeOut+=m<10?'0'+m:m;
    return timeOut;
  }
}
