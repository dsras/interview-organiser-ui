import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellDayFilterPipe } from './filters/cell-day-filter.pipe';
import { IterableArrayPipe } from './filters/iterable-array.pipe';
import { MapToArrayPipe } from './filters/map-to-array.pipe';
import { StringToDatetimePipe } from './conversion/string-to-datetime.pipe';
import { DateToTimePipe } from './conversion/date-to-time.pipe';
import { MapKeysPipe } from './filters/map-keys.pipe';
import { MapValuesPipe } from './filters/map-values.pipe';

@NgModule({
  declarations: [
    CellDayFilterPipe,
    IterableArrayPipe,
    MapToArrayPipe,
    StringToDatetimePipe,
    DateToTimePipe,
    MapKeysPipe,
    MapValuesPipe,
  ],
  imports: [CommonModule],
  exports: [
    CellDayFilterPipe,
    IterableArrayPipe,
    MapToArrayPipe,
    StringToDatetimePipe,
    DateToTimePipe,
    MapValuesPipe,
    MapKeysPipe,
  ],
})
export class PipeModule {}
