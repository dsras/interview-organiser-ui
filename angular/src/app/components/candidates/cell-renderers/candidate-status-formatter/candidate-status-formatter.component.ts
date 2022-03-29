import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-candidate-status-formatter',
    templateUrl: './candidate-status-formatter.component.html',
    styleUrls: ['./candidate-status-formatter.component.scss']
})
export class CandidateStatusFormatterComponent implements AgRendererComponent {
    value: string = '';
    type: string = '';
    constructor() { }

    agInit(params: ICellRendererParams): void {
        if (params) {
            this.value = params.value;
            if (this.value === null || this.value.trim() === '') {
                this.value = 'Not Started';
            }
            if (this.value === 'Offered' || this.value === 'Mapped' || this.value === 'Client Interview In Progress' || this.value === 'Yet to Begin') {
                this.type = 'amber';
            } else if (this.value === 'Available') {
                this.type = 'primary';
            } else if (this.value === 'Drop Out' || this.value === 'Interview Rejected') {
                this.type = 'red';
            } else if (this.value === 'Interview Selected' || this.value === 'Onboarding' || this.value === 'Started' || this.value === 'Joined') {
                this.type = 'green';
            }
        }
    }
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}
