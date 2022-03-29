import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMetadata } from '../../models/core/metadata.model';
import { IPositions } from '../../models/core/positions.model';
import { BackendService } from '../../services/backend.service';
import { DataSourceService } from '../../services/data-source.service';
import { forkJoin } from 'rxjs';

export interface IPositionComponent {
    onPositionSelect(item: IPositions): void
}

@Component({
    selector: 'app-positions',
    templateUrl: './positions.component.html',
    styleUrls: ['./positions.component.scss']
})

export class PositionsComponent implements OnInit, IPositionComponent {
    selectedRow: IPositions = <any>null;
    constructor(private router: Router, private _dataSourceService: DataSourceService, private _backendService: BackendService) {
    }

    ngOnInit(): void {
        this._dataSourceService.updateDataSource('route', 'positions');
        this._dataSourceService.getDataSource('addPosition').subscribe((data: any) => {
            if (data) {
                this.handlePositionRefresh();
            }
        })
        this.getApplicationData();
    }
    onPositionSelect(item: IPositions): void {
        this.selectedRow = item;
    }
    getApplicationData(): void {
        const metadataObservable = this._backendService.getMetadata();
        const getPositionObservable = this._backendService.getPositions();
        const usersObservable = this._backendService.getUser('');
        const allCandidatesObservable = this._backendService.getCandidates();
        forkJoin([metadataObservable, getPositionObservable, usersObservable, allCandidatesObservable]).subscribe((response: Array<any>) => {
            this._dataSourceService.updateDataSource('metadata',response[0]);
            this._dataSourceService.updateDataSource('allPositions', response[1]);
            this._dataSourceService.updateDataSource('users', response[2]);
            this._dataSourceService.updateDataSource('allCandidates', response[3]);
            if (response[1].length > 0) {
                this.selectedRow = response[1][0];
                this._dataSourceService.updateDataSource('selectedPosition', this.selectedRow);
            }
        },(error: any) => {
            if (error.status === 403) {
                this.router.navigate(['login']);
            }
        })
    }
    handlePositionRefresh(): void {
        this._backendService.getPositions().subscribe((positionResponse: any) => {
            if (positionResponse) {
                this._dataSourceService.updateDataSource('allPositions', positionResponse);
            }
        })
    }
}
