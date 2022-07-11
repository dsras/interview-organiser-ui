import { Pipe, PipeTransform } from '@angular/core';
import { CalendarMonthViewDay } from 'angular-calendar';
import { DayCellRecruiter } from '../../shared/models/calendar-event-detail';

@Pipe({
  name: 'cellDayFilter'
})
export class CellDayFilterPipe implements PipeTransform {

  transform(cellArray: DayCellRecruiter[], filter: CalendarMonthViewDay): DayCellRecruiter[] {
    if (!cellArray || !filter ) {
      return cellArray
    }
    return cellArray.filter(cell => cell.date == filter.date)
  }

}
