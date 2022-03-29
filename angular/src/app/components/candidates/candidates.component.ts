import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ICandidate } from 'src/app/models/core/candidate.model';
import { IMetadata } from 'src/app/models/core/metadata.model';
import { BackendService } from '../../services/backend.service';
import { DataSourceService } from '../../services/data-source.service';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { IGridConfig } from 'src/app/models/grid/grid.config.model';
import { GridConfigService } from 'src/app/services/grid-config.service';
import { GridService } from 'src/app/services/grid.service';

declare const alasql: any;
@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
    columnDefs: ColDef[] = [];
    rowData: Array<ICandidate> = [];
    total: number = 0;
    modalRef?: BsModalRef;
    metadata: any;
    locations: Array<any> = [];
    filters: any;
    selectedLocation: string = 'All';
    types: Array<string> = ['All Candidates', 'All Bench', 'Available - Bench Only', 'Available - Market Only', 'Available - Bench + Market', 'Drop Out or Offer Reject'];
    gridConfig: IGridConfig = <any>null;
    displayedData: Array<any> = [];
    constructor(private router: Router, private _dataSourceService: DataSourceService, private _backEndService: BackendService, private _modalService: BsModalService,
        private _gridConfigService: GridConfigService, private _gridService: GridService) {
        this.columnDefs = this._gridConfigService.getCandidateGridColDef();
        this.filters = new FormGroup({
            location: new FormControl('All'),
            type: new FormControl('Available - Bench Only'),
            quickFilter: new FormControl('')
        });
        setTimeout(() => {
            this.gridConfig = {
                height: this.getGridHeight(),
                headerHeight: 40,
                gridName: 'candidateGrid'
            }
        }, 10);
    }
    getGridHeight(): number {
        const totalHeight: number = window.innerHeight;
        const headerNode: any = document.querySelector('.header-main');
        const gridHeaderNode: any = document.querySelector('.candidates-main .container-fluid .row');
        const gridHeaderHeight: number = (gridHeaderNode && gridHeaderNode.offsetHeight) ? gridHeaderNode.offsetHeight : 0;
        const headerHeight: number = (headerNode && headerNode.offsetHeight) ? headerNode.offsetHeight : 0;
        return totalHeight - (headerHeight + gridHeaderHeight + 20 + 3);
    }
    ngOnInit(): void {
        this._dataSourceService.updateDataSource('route', 'candidates');
        this._backEndService.getMetadata().subscribe((metaDataResponse: IMetadata) => {
            if (metaDataResponse) {
                this.metadata = metaDataResponse;
                if (this.metadata && this.metadata.Location) {
                    this.locations.push({ key: 'All', value: 'All' });
                    Object.keys(this.metadata.Location).forEach((key: string) => {
                        this.locations.push({
                            key: key,
                            value: this.metadata.Location[key]
                        })
                    })
                }
            }
        }, (error: any) => {
            if (error.status === 403) {
                this.router.navigate(['login']);
            }
        })
        this.getCandidates();
        this._dataSourceService.getDataSource('updateCandidate').subscribe((data: any) => {
            if (data) {
                this.getCandidates();
            }
        })
        this._dataSourceService.getDataSource('row_count').subscribe((totalConfig: any) => {
            if (totalConfig && totalConfig.gridName === this.gridConfig.gridName) {
                this.total = totalConfig.count;
            }
        })
    }
    getCandidates(): void {
        this._backEndService.getCandidates().subscribe((responseData: Array<any>) => {
            if (responseData) {
                const updatedData: Array<ICandidate> = responseData;
                this.rowData = updatedData;
                setTimeout(() => {
                    this.onTypeSelect();
                }, 100)
            } else {
                this.rowData = [];
            }
            this.total = this.rowData.length;
        })
    }
    dateFormatter(candidate: any): string {
        if (candidate && candidate.value) {
            return moment(candidate.value).format('DD MMM YYYY');
        }
        return '';
    }
    skillFormatter(candidate: any): any {
        const mainDiv = document.createElement('div');
        candidate.value.forEach((skill: any) => {
            const skillSPan = document.createElement('span');
            skillSPan.className = 'pills';
            skillSPan.innerHTML = skill;
            mainDiv.appendChild(skillSPan);
        })
        return mainDiv.innerHTML;
    }
    openModal(): void {
        const initialState: ModalOptions = {
            initialState: {
                cb: this.updateCandidateGrid.bind(this)
            }
        };
        this.modalRef = this._modalService.show(AddCandidateComponent, initialState);
    }
    updateCandidateGrid(): void {
        this.getCandidates();
    }
    onLocationSelect(): void {
        if (this.filters && this.filters.value) {
            this.selectedLocation = this.filters.value.location;
            this._dataSourceService.updateDataSource('grid_filter', { field: 'location', value: this.selectedLocation, gridName: this.gridConfig.gridName });
        }
    }
    applyQuickFilter(): void {
        this.filters.controls['location'].setValue('All');
        this.filters.controls['type'].setValue('All Candidates');
        this._dataSourceService.updateDataSource('grid_quick_filter', { value: this.filters.value['quickFilter'], gridName: this.gridConfig.gridName });
    }
    removeQuickFilter(): void {
        this.filters.controls['quickFilter'].setValue('');
        const masterData = this._gridService.getGridMasterData(this.gridConfig.gridName);
        this._gridService.updateGridRowData(this.gridConfig.gridName, masterData);
        this._dataSourceService.updateDataSource('row_count', { 'gridName': this.gridConfig.gridName, 'count': masterData.length });
    }
    updateGridAfterFilter(result: Array<any>): void {
        const apis: [GridApi, ColumnApi] = this._gridService.getGridApis(this.gridConfig.gridName);
        let count = 0;
        if (result.length > 0) {
            count = result.length;
            this._gridService.updateGridRowData(this.gridConfig.gridName, result);
        } else {
            if (apis && apis[0]) {
                apis[0].setRowData([]);
            }
        }
        this._dataSourceService.updateDataSource('row_count', { 'gridName': this.gridConfig.gridName, 'count': count });
    }
    onTypeSelect(): void {
        const masterData = this._gridService.getGridMasterData(this.gridConfig.gridName);
        const selectedType = this.filters.value['type'];
        let query = "SELECT * FROM ? WHERE ";
        if (selectedType === 'Drop Out or Offer Reject') {
            query += "accoliteOnboardingStatus='Drop Out' OR accoliteOnboardingStatus='Offer Rejected'";
        } else if (selectedType === 'All Bench') {
            query += "accoliteOnboardingStatus='Joined' AND clientOnboardingStatus!='Onboarded'";
        } else if (selectedType === 'Available - Bench Only') {
            query += "clientInteractionStatus='Available' AND accoliteOnboardingStatus='Joined'";
        } else if (selectedType === 'Available - Market Only') {
            query += "clientInteractionStatus='Available' AND (accoliteOnboardingStatus='Sourced' OR accoliteOnboardingStatus='Client Interview InProgress' OR accoliteOnboardingStatus='Offered')";
        } else if (selectedType === 'Available - Bench + Market') {
            query += "clientInteractionStatus='Available' AND accoliteOnboardingStatus!='Drop Out' AND accoliteOnboardingStatus!='Offer Rejected'";
        } else if (selectedType === 'All Candidates') {
            this.updateGridAfterFilter(masterData);
            return;
        }
        this.displayedData = alasql(query, [masterData]);
        this.updateGridAfterFilter(this.displayedData);
    }
    export(): void {
        this._gridService.exportToExcel(this.gridConfig.gridName);
    }
}
