import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { GridConfigService } from 'src/app/services/grid-config.service';
import { ColDef } from 'ag-grid-community';
import { IGridConfig } from 'src/app/models/grid/grid.config.model';

@Component({
    selector: 'app-audit-trail',
    templateUrl: './audit-trail.component.html',
    styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {
    selectedPosition: any;
    gridColDef: Array<ColDef> = [];
    gridRowData: Array<any> = [];
    gridConfig: IGridConfig = {
        height: this.getGridHeight(),
        headerHeight: 48,
        gridName: 'positionAuditTrailGrid'
    }
    @Input()
    set position(value: any) {
        this.selectedPosition = value;
        this.getAuditTrail(this.selectedPosition.positionId);
    }
    constructor(private _backendService: BackendService, private _gridConfigServie: GridConfigService) { }
    ngOnInit(): void {
        this.gridColDef = this._gridConfigServie.getAuditTrailConfig();
    }
    getAuditTrail(id: string): void {
        this._backendService.getPositionAuditTrail(id).subscribe((positionAuditTrailResponse: any) => {
            if (positionAuditTrailResponse) {
                this.gridRowData = positionAuditTrailResponse;
            }
        })
    }
    getGridHeight(): number {
        const totalHeight: number = window.innerHeight;
        const titleBar: any = document.querySelector('.title-bar');
        const jobDetials: any = document.querySelector('.job-details');
        let gridHeight: number = 0;
        if (titleBar && jobDetials) {
            const titleBarHeight: number = titleBar.offsetHeight;
            const jobDetialsHeight: number = jobDetials.offsetHeight;
            gridHeight = totalHeight - (titleBarHeight +  jobDetialsHeight + 141);
        }
        return gridHeight;
    }
}
