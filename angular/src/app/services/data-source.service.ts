import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IDataSourceService {
    createDataSource(): void;
    getDataSource(source: string): void;
    updateDataSource(source: string, value: any): void
}

interface IDataSource {
    route: any;
    metadata: any;
    users: any;
    allPositions: any;
    allCandidates: any;
    selectedPosition: any;
    addPosition: any;
    updateCandidate: any;
    loginType: any;
    grid_quick_filter: any;
    grid_filter: any;
    row_count: any;
    updateMappedCandidates: any;
}

class DataSource implements IDataSource {
    route: any = null;
    metadata: any = null;
    users: any = null;
    allPositions: any = null;
    allCandidates: any = null;
    addPosition: any = null;
    updateCandidate: any = null;
    selectedPosition: any = null;
    loginType: any = null;
    grid_quick_filter: any = null;
    grid_filter: any = null;
    row_count: any = null;
    updateMappedCandidates: any = null;
    constructor() {
        this.route = new BehaviorSubject(null);
        this.metadata = new BehaviorSubject(null);
        this.users = new BehaviorSubject(null);
        this.allPositions = new BehaviorSubject(null);
        this.allCandidates = new BehaviorSubject(null);
        this.selectedPosition = new BehaviorSubject(null);
        this.addPosition = new BehaviorSubject(null);
        this.updateCandidate = new BehaviorSubject(null);
        this.loginType = new BehaviorSubject(null);
        this.grid_quick_filter = new BehaviorSubject(null);
        this.grid_filter = new BehaviorSubject(null);
        this.row_count = new BehaviorSubject(null);
        this.updateMappedCandidates = new BehaviorSubject(null);
    }
}

@Injectable({
    providedIn: 'root'
})

export class DataSourceService implements IDataSourceService {
    private _dataSource: any;
    constructor() {
    }
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

