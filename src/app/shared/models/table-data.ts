import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { InterviewTableReturn, InterviewReturn, SkillReturn } from './types';

export class InterviewTableData extends DataSource<InterviewReturn> {
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
export class InterviewTableData2 extends DataSource<InterviewTableReturn> {
  private _dataStream = new ReplaySubject<InterviewTableReturn[]>();

  constructor(initialData: InterviewTableReturn[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<InterviewTableReturn[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: InterviewTableReturn[]) {
    this._dataStream.next(data);
  }
}

export class SkillCoverageTableData extends DataSource<SkillReturn> {
  private _dataStream = new ReplaySubject<SkillReturn[]>();

  constructor(initialData: SkillReturn[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<SkillReturn[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: SkillReturn[]) {
    this._dataStream.next(data);
  }
}

