import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { InterviewReturn, SkillReturn } from './types';

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

