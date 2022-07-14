import { Pipe, PipeTransform } from '@angular/core';
import { timeout } from 'rxjs';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Pipe({
  name: 'DateToShortDate',
})
export class DateToShortDate implements PipeTransform {
  transform(dateInput: Date){
    let dateOut = '';
    dateOut += monthNames[dateInput.getMonth()] + ' ' + dateInput.getDate().toString();
    return dateOut;
  }
}