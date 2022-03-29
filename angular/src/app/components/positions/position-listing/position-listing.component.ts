import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IGridConfig } from 'src/app/models/grid/grid.config.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { GridConfigService } from 'src/app/services/grid-config.service';
import { CreatePositionComponent } from '../create-position/create-position.component';

@Component({
    selector: 'app-position-listing',
    templateUrl: './position-listing.component.html',
    styleUrls: ['./position-listing.component.scss']
})
export class PositionListingComponent implements OnInit {
    total: number = 0;
    rowData$: Array<any> = [];
    metadata$: any = null;
    bsModalRef?: BsModalRef;
    Locations:Array<any> = [];
    filterForm: any;
    displayedColumns: Array<any> = [];

    // [new data]
    gridColDef: Array<ColDef> = [];
    gridRowData: Array<any> = [];
    gridConfig: IGridConfig = {
        height: this.getGridHeight(),
        isQuickFilter: true,
        headerHeight: 30,
        rowHeight: 30,
        gridName: 'positionListingGrid'
    }
    constructor(private _modalService: BsModalService, private _gridConfigService: GridConfigService, private _dataSourceService: DataSourceService) {
        this.filterForm = new FormGroup({
            location: new FormControl('All'),
            quickFilter: new FormControl('')
        });
    }

    getGridHeight(): number {
        const bodyheight = document.getElementsByTagName('body')[0].offsetHeight;
        const menuHeight = document.getElementsByClassName('header-main')[0].clientHeight;
        const gridHeaderHeight = 62;
        return bodyheight - (menuHeight + gridHeaderHeight);
    }

    ngOnInit(): void {
        const columns = this._gridConfigService.getPositionListingConfig();
        this.gridColDef = columns;
        columns.forEach((def: ColDef) => {
            this.displayedColumns.push(def.field);
        })
        this._dataSourceService.getDataSource('metadata').subscribe((metadata: any) => {
            if (metadata) {
                this.metadata$ = metadata;
                if (this.metadata$.Location) {
                    this.Locations.push({
                        key: 'All',
                        value: 'All'
                    })
                    Object.keys(this.metadata$.Location).forEach((loc: string) => {
                        this.Locations.push({
                            key: loc,
                            value: this.metadata$.Location[loc]
                        })
                    })
                }
            }
        })
        this._dataSourceService.getDataSource('allPositions').subscribe((positions: any) => {
            if (positions) {
                this.rowData$ = positions;
                if (this.rowData$ && this.rowData$.length > 0) {
                    this.total = this.rowData$.length;
                }
            }
        })
        this._dataSourceService.getDataSource('row_count').subscribe((totalConfig: any) => {
            if (totalConfig && totalConfig.gridName === this.gridConfig.gridName) {
                this.total = totalConfig.count;
            }
        })
    }
    openAddPosition(): void {
        const initialState: ModalOptions = {
            initialState: {
                metaData: this.metadata$,
                modalType: 'add'
            },
            class: 'modal-lg'
        };
        this.bsModalRef = this._modalService.show(CreatePositionComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Close';
    }
    applyQuickFilter(): void {
        this.filterForm.controls['location'].setValue('All');
        this._dataSourceService.updateDataSource('grid_quick_filter', {value: this.filterForm.value['quickFilter'], gridName: this.gridConfig.gridName})
    }
    applyLocationFilter(): void {
        this._dataSourceService.updateDataSource('grid_filter', {field: 'location', value: this.filterForm.value['location'], gridName: this.gridConfig.gridName})
    }
    removeFilter(): void {
        this.filterForm.controls['quickFilter'].setValue('');
        this.applyQuickFilter();
    }
    onGridRowSelected(data: any): void {
        this._dataSourceService.updateDataSource('selectedPosition', data);
    }
}
