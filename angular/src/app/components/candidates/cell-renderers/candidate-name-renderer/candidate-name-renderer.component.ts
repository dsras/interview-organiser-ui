import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CandidateAuditTrailComponent } from '../../candidate-audit-trail/candidate-audit-trail.component';

@Component({
    selector: 'app-candidate-name-renderer',
    templateUrl: './candidate-name-renderer.component.html',
    styleUrls: ['./candidate-name-renderer.component.scss']
})
export class CandidateNameRendererComponent implements AgRendererComponent {
    name: string = '';
    id: number = 0;
    bsModalRef?: BsModalRef;
    link: string = '';
    constructor(private _modalService: BsModalService) { }

    agInit(params: ICellRendererParams): void {
        if (params) {
            this.name = params.value;
            this.id = (params.data && params.data.id) ? params.data.id : (params.data && params.data.candidateId) ? params.data.candidateId : null;
            this.link = (params.data && params.data.link) ? params.data.link : '';
        }
    }
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
    openCandidateAuditTrail(): void {
        const initialState: ModalOptions = {
            initialState: {
                id: this.id
            },
            class: 'modal-lg'
        };
        this.bsModalRef = this._modalService.show(CandidateAuditTrailComponent, initialState);
    }

}
