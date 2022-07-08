import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { CalendarEventAvailability, CalendarEventInterview } from './calendar-event-detail';
import { InterviewReturn, SkillReturn } from './types';

export class AvailabilityTableData extends DataSource<CalendarEventAvailability> {
  private _dataStream = new ReplaySubject<CalendarEventAvailability[]>();
  filter!: string;

  constructor(initialData: CalendarEventAvailability[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<CalendarEventAvailability[]> {
    return this._dataStream;
  }

  disconnect(): void {
    this._dataStream.unsubscribe();
  }

  setData(data: CalendarEventAvailability[]): void {
    this._dataStream.next(data);
  }
}

export class InterviewTableDisplayData extends DataSource<CalendarEventInterview>{
  private _dataStream = new ReplaySubject<CalendarEventInterview[]>();
  filter!: string;

  constructor(initialData: CalendarEventInterview[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<CalendarEventInterview[]> {
    return this._dataStream;
  }

  disconnect(): void {
    this._dataStream.unsubscribe();
  }

  setData(data: CalendarEventInterview[]): void {
    this._dataStream.next(data);
  }
}

export class InterviewTableData extends DataSource<InterviewReturn> {
  private _dataStream = new ReplaySubject<InterviewReturn[]>();
  filter!: string;

  constructor(initialData: InterviewReturn[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<InterviewReturn[]> {
    return this._dataStream;
  }

  disconnect(): void {
    this._dataStream.unsubscribe();
  }

  setData(data: InterviewReturn[]): void {
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
