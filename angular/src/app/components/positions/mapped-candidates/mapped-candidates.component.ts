import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IMetadata } from 'src/app/models/core/metadata.model';
import { IPositions } from 'src/app/models/core/positions.model';
import { IGridConfig } from 'src/app/models/grid/grid.config.model';
import { BackendService } from 'src/app/services/backend.service';
import { DataSourceService } from 'src/app/services/data-source.service';
import { GridConfigService } from 'src/app/services/grid-config.service';
import { CandidateAuditTrailComponent } from '../../candidates/candidate-audit-trail/candidate-audit-trail.component';
import { CandidateMappingComponent } from '../candidate-mapping/candidate-mapping.component';

@Component({
    selector: 'app-mapped-candidates',
    templateUrl: './mapped-candidates.component.html',
    styleUrls: ['./mapped-candidates.component.scss']
})
export class MappedCandidatesComponent implements OnInit {
    mappedCandidates: Array<any> = [];
    candidateMapping: any = {};
    position$: IPositions = <any>null;
    isError: boolean = false;
    errorMsg: string = 'Error occured. Please provide correct ID or try again';
    bsModalRef?: BsModalRef;
    metadata$: IMetadata = <any>null;
    gridColDef?: Array<any>;
    gridRowData: any;
    gridConfig: IGridConfig = {
        height: this.getGridHeight(),
        headerHeight: 35,
        gridName: 'mappedCandidatesGrid'
    }

    @Input()
    set position(value: any) {
        if(value) {
            this.position$ = value;
            this.fetchMappedCandidates();
        }
    }

    @Input()
    set metadata(value: IMetadata) {
        this.metadata$ = value;
    }

    constructor(private _backEndService: BackendService, private _modalService: BsModalService, private _gridConfigService: GridConfigService,
        private _dataSourceService: DataSourceService, private router: Router) { }

    fetchMappedCandidates(): void {
        this._backEndService.getMappedCandidatesToPosition(this.position$.positionId).subscribe((mappedResponse: any) => {
            this.isError = false;
            if (mappedResponse) {
                this.mappedCandidates = mappedResponse;
                this.gridRowData = mappedResponse;
            }
        }, (error: any) => {
            this.isError = true;
            if (error.error && error.error.message) {
                this.errorMsg = error.error.message;
                if (error.error.status === 'NOT_FOUND') {
                    this.errorMsg = 'No candidates Mapped';
                }
            } else {
                this.errorMsg = <any>null;
            }
            if (!this.errorMsg) {
                this.router.navigate(['login']);
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
    ngOnInit(): void {
        this._backEndService.getCandidates().subscribe((candidateResponseData: Array<any>) => {
            if (candidateResponseData) {
                this.candidateMapping = {};
                candidateResponseData.forEach((candidate: any) => {
                    this.candidateMapping[candidate.id] = candidate.candidateName;
                })
            }
        })
        this.gridColDef = this._gridConfigService.getMappedCandidatesConfig();
        this._dataSourceService.getDataSource('updateMappedCandidates').subscribe((response: boolean) => {
            if(response) {
                this.fetchMappedCandidates();
            }
        })
    }
    mapCandidate(): void {
        const initialState: ModalOptions = {
            initialState: {
                cb: this.fetchMappedCandidates.bind(this)
            }
        };
        this.bsModalRef = this._modalService.show(CandidateMappingComponent, initialState);
    }
    openCandidateAuditTrail(candidateId: number): void {
        const initialState: ModalOptions = {
            initialState: {
                id: candidateId
            },
            class: 'modal-lg'
        };
        this.bsModalRef = this._modalService.show(CandidateAuditTrailComponent, initialState);
    }
}
