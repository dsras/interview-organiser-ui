import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { InterviewReturn } from './types';

export class TableDataSource extends DataSource<InterviewReturn> {
  private _dataStream = new ReplaySubject<InterviewReturn[]>();

  constructor(initialData: InterviewReturn[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<InterviewReturn[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: InterviewReturn[]) {
    this._dataStream.next(data);
  }
}

