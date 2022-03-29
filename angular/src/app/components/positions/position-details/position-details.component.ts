import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPositions } from 'src/app/models/core/positions.model';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
    selector: 'app-position-details',
    templateUrl: './position-details.component.html',
    styleUrls: ['./position-details.component.scss']
})
export class PositionDetailsComponent implements OnInit {
    selectedRow: IPositions = <any>null;
    tabs: any;
    constructor(private _dataSourceService: DataSourceService) {
        this.tabs = new FormGroup({
            candidates: new FormControl(true),
            description: new FormControl(false),
            auditTrail: new FormControl(false)
        });
    }

    ngOnInit(): void {
        this._dataSourceService.getDataSource('selectedPosition').subscribe((selectedRow: any) => {
            if (selectedRow) {
                this.selectedRow = selectedRow;
            }
        })
    }
    updateTab(tab: string): void {
        let updatedValue: boolean = false;
        if (tab === "description") {
            updatedValue = this.tabs.value['description'];
            this.tabs.controls['description'].setValue(true);
            if (updatedValue) {
                this.tabs.controls['candidates'].setValue(false);
                this.tabs.controls['auditTrail'].setValue(false);
            }
        } else if (tab === "candidates") {
            updatedValue = this.tabs.value['candidates'];
            this.tabs.controls['candidates'].setValue(true);
            if (updatedValue) {
                this.tabs.controls['description'].setValue(false);
                this.tabs.controls['auditTrail'].setValue(false);
            }
        } else if (tab === "auditTrail") {
            updatedValue = this.tabs.value['auditTrail'];
            this.tabs.controls['auditTrail'].setValue(true);
            if (updatedValue) {
                this.tabs.controls['description'].setValue(false);
                this.tabs.controls['candidates'].setValue(false);
            }
        }
    }
}
