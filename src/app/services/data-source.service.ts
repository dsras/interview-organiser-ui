import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataSourceService } from '../shared/models/data-source-service';
import { DataSource } from '../shared/models/data-service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService implements IDataSourceService {
  private _dataSource: any;
  constructor() {}
  createDataSource(): void {
    this._dataSource = new DataSource();
  }
  getDataSource(source: string): Observable<any> {
    return this._dataSource[source].asObservable();
  }
  updateDataSource(source: string, value: any): void {
    if (this._dataSource && this._dataSource[source]) {
      if (this._dataSource[source] !== value) {
        this._dataSource[source].next(value);
      }
    }
  }
}
