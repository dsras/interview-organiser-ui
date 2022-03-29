import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-job-description',
    templateUrl: './job-description.component.html',
    styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
    description$: any;
    @Input()
    set description(value: any) {
        if (value) {
            this.description$ = value;
        }
    }
    constructor() { }

    ngOnInit(): void {
    }

}
