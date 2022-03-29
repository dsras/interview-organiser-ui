import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IMetadata } from 'src/app/models/core/metadata.model';
import { BackendService } from 'src/app/services/backend.service';
import { AddCandidateComponent } from './../../add-candidate/add-candidate.component';

@Component({
    selector: 'app-candidate-edit-renderer',
    templateUrl: './candidate-edit-renderer.component.html',
    styleUrls: ['./candidate-edit-renderer.component.scss']
})
export class CandidateEditRendererComponent implements AgRendererComponent {

    constructor(private _modalService: BsModalService, private _backEndService: BackendService) { }

    candidateDetails: any;
    modalRef?: BsModalRef;

    agInit(params: ICellRendererParams): void {
        if (params) {
            this.candidateDetails = params.data;
        }
    }
    refresh(params: ICellRendererParams): boolean {
        return true;
    }
    editCandidate() {
        const initialState: ModalOptions = {
            initialState: {
                selectedCandidate: this.candidateDetails
            }
        };
        this.modalRef = this._modalService.show(AddCandidateComponent, initialState);
    }
}
