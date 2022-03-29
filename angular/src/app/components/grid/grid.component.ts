import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGridConfig } from 'src/app/models/grid/grid.config.model';
import { ColDef, GridReadyEvent, SelectionChangedEvent, SortChangedEvent  } from "ag-grid-community";
import { CandidateEditRendererComponent } from "src/app/components/candidates/cell-renderers/candidate-edit-renderer/candidate-edit-renderer.component";
import { CandidateNameRendererComponent } from "src/app/components/candidates/cell-renderers/candidate-name-renderer/candidate-name-renderer.component";
import { CandidateStatusFormatterComponent } from "src/app/components/candidates/cell-renderers/candidate-status-formatter/candidate-status-formatter.component";

import { IGridOptions } from '../../models/grid/grid.data.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { GridService } from 'src/app/services/grid.service';
import { MappedCandidateEditComponent } from '../candidates/cell-renderers/mapped-candidate-edit/mapped-candidate-edit.component';
import { SkillRendererComponent } from '../candidates/cell-renderers/skill-renderer/skill-renderer.component';
import { AgingRendererComponent } from '../candidates/cell-renderers/aging-renderer/aging-renderer.component';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    gridOptions?: IGridOptions;
    gridConfig: IGridConfig = <any>null;
    gridName: string = '';

    @Input()
    set colDef(value: Array<ColDef>) {
        if (value && this.gridOptions) {
            this.gridOptions.columnDefs = value;
        }
    }

    @Input()
    set rowData(value: Array<any>) {
        if (value) {
            this._gridService.updateGridRowData(this.gridName, value);
            this._gridService.updateGridMasterData(this.gridName, value);
            if (this.gridOptions) {
                this.gridOptions.rowData = value;
            }
        }
    }

    @Input()
    set config(value: IGridConfig) {
        if (value) {
            this.gridConfig = value;
        }
        if (this.gridConfig) {
            if (this.gridConfig.headerHeight) {
                this.updateHeaderRowHeight(this.gridConfig.headerHeight);
            }
            if (this.gridConfig.gridName) {
                this.gridName = this.gridConfig.gridName;
            }
            if (this.gridConfig.rowHeight) {
                this.updateRowHeight(this.gridConfig.rowHeight);
            }
        }
    }
    @Output() select = new EventEmitter();

    constructor(private _dataSourceService: DataSourceService, private _gridService: GridService) {
        this.gridOptions = {
            headerHeight: 50,
            rowHeight: 35,
            rowSelection: 'single',
            suppressLoadingOverlay: true,
            defaultColDef: {
                sortable: true,
                resizable: true,
                suppressMovable: true,
                enableCellTextSelection: true
            },
            frameworkComponents: {
                nameRenderer: CandidateNameRendererComponent, // Names should be changed later
                editRenderer: CandidateEditRendererComponent,
                statusRenderer: CandidateStatusFormatterComponent,
                mappedCandidateEditRenderer: MappedCandidateEditComponent,
                skillRenderer: SkillRendererComponent,
                agingRenderer: AgingRendererComponent
            }
        }
    }

    ngOnInit(): void {
        this._dataSourceService.getDataSource('grid_filter').subscribe((filterValue: any) => {
            if (filterValue && this.gridName === filterValue.gridName) {
                this.applyFilter(filterValue);
            }
        })
        this._dataSourceService.getDataSource('grid_quick_filter').subscribe((filterValue: any) => {
            if (filterValue && this.gridName === filterValue.gridName) {
                this.applyQuickFilter(filterValue);
            }
        })
    }
    onGridReady(event: GridReadyEvent): void {
        this._gridService.updateGridApis(this.gridName, event.api, event.columnApi);
    }
    onSelectionChanged(event: SelectionChangedEvent): void {
        const selectedRows = event.api.getSelectedRows();
        if (selectedRows && selectedRows.length > 0) {
            this.select.emit(selectedRows[0]);
        }
    }
    updateHeaderRowHeight(height: number): void {
        if (this.gridOptions) {
            this.gridOptions.headerHeight = height;
        }
    }
    updateRowHeight(height: number): void {
        if (this.gridOptions) {
            this.gridOptions.rowHeight = height;
        }
    }
    applyFilter(filterconfig: any) {
        this._gridService.applyFilterInColumn(filterconfig.gridName, filterconfig.field, filterconfig.value);
    }
    applyQuickFilter(filterconfig: any) {
        const gridRows = this._gridService.applyQuickFilter(filterconfig.gridName, filterconfig.value);
        this._dataSourceService.updateDataSource('row_count', {'gridName': filterconfig.gridName, 'count': gridRows});
    }
}
