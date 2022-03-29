import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-position-details-info',
    templateUrl: './position-details-info.component.html',
    styleUrls: ['./position-details-info.component.scss']
})
export class PositionDetailsInfoComponent implements OnInit {
    selectedRow$: any;

    @Input()
    set selectedRow(value: any) {
        if (value) {
            this.selectedRow$ = value;
        }
    }
    constructor() { }

    ngOnInit(): void {
    }

}
