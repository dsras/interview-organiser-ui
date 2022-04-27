import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'stringTime'
})
export class StringTimePipe implements PipeTransform {


  transform(value: any): string {
    if (value) {
      return moment(value).format('hh:mm');
    }
    return '';
  }

}
