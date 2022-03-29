import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { APPCONSTANTS } from 'src/app/constants/app.constant';

@Component({
    selector: 'app-aging-renderer',
    templateUrl: './aging-renderer.component.html',
    styleUrls: ['./aging-renderer.component.scss']
})
export class AgingRendererComponent implements AgRendererComponent {
    value: any;
    type: string = '';
    constructor() { }
    agInit(params: ICellRendererParams): void {
        let age: any = null;
        if (params && params.data && params.data.candidateDetails && params.data.candidateDetails.Age) {
            age = params.data.candidateDetails.Age;
        } else {
            age = null;
        }
        if (params && params.data && params.data.accoliteOnboardingStatus === 'Drop Out' || params.data.accoliteOnboardingStatus === 'Offer Rejected') {
            this.value = 'NA';
            this.type = '';
            age = null;
        }
        if (age) {
            this.value = params.data.candidateDetails.Age;
            if (this.value > 0 && this.value <= 30) {
                this.type = APPCONSTANTS.COMMON_CONSTANTS.GREEN;
            } else if (this.value > 30 && this.value <= 40) {
                this.type = APPCONSTANTS.COMMON_CONSTANTS.AMBER;
            } else if (this.value > 40) {
                this.type = APPCONSTANTS.COMMON_CONSTANTS.RED;
            } else {
                if (this.value < 0) {
                    this.value = Math.abs(this.value) + ' Days to Join';
                    this.type = APPCONSTANTS.COMMON_CONSTANTS.PRIMARY;
                }
            }
        }
    }
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}
