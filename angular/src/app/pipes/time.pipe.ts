import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      return moment(value).format('hh:mm');
    }
    return '';
  }

}
