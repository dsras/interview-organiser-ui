import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-skill-renderer',
    templateUrl: './skill-renderer.component.html',
    styleUrls: ['./skill-renderer.component.scss']
})
export class SkillRendererComponent implements AgRendererComponent {
    values: Array<string> = [];
    constructor() { }
    agInit(params: ICellRendererParams): void {
        if (params) {
            this.values = params.value;
        }
    }
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
}
