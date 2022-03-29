import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CandidateMappingComponent } from 'src/app/components/positions/candidate-mapping/candidate-mapping.component';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
    selector: 'app-mapped-candidate-edit',
    templateUrl: './mapped-candidate-edit.component.html',
    styleUrls: ['./mapped-candidate-edit.component.scss']
})

export class MappedCandidateEditComponent implements AgRendererComponent {

    constructor(private _modalService: BsModalService, private _dataSourceService: DataSourceService) { }

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
    editMappedCandidate() {
        const initialState: ModalOptions = {
            initialState: {
                candidate: this.candidateDetails,
                cb: this.handleResponse.bind(this)
            }
        };
        this.modalRef = this._modalService.show(CandidateMappingComponent, initialState);
    }
    handleResponse() {
        this._dataSourceService.updateDataSource('updateMappedCandidates', true)
    }
}
