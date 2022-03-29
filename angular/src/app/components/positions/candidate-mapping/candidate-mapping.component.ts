import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { Observable, of, Subscriber } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import * as moment from 'moment';

import { BackendService } from '../../../services/backend.service';
import { ICandidateMappingRequest } from '../../../models/request/candidate-mapping.model';
import { IMetadata } from '../../../models/core/metadata.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../modal/modal.component';
import { OnDestroy } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import { ICandidate } from 'src/app/models/core/candidate.model';
import { Router } from '@angular/router';
declare const alasql: any;
@Component({
    selector: 'app-candidate-mapping',
    templateUrl: './candidate-mapping.component.html',
    styleUrls: ['./candidate-mapping.component.scss']
})
export class CandidateMappingComponent implements OnInit, OnDestroy {
    datePickerConfig: Object = {
        isAnimated: true,
        adaptivePosition: true,
        returnFocusToInput: true,
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-default',
        minDate: new Date(moment().subtract(30, 'days').format('YYYY-MM-DD')),
        maxDate: new Date(moment().add(90, 'days').format('YYYY-MM-DD'))
    };
    selectedPosition: any;
    candidateDataSource: Observable<any[]>;
    selectedCandidate?: any;
    typeaheadLoading?: boolean;
    allCandidates: Array<any> = [];
    candidateMappingForm: any;
    rectuier: any = null;
    clientInteractionStatus: Array<any> = [];
    clientOnboardingStatus: Array<any> = [];
    errorMsg: any = null;
    cb: any;
    errorModalRef?: BsModalRef;
    candidate: any;
    isEdit: boolean = true;
    constructor(private _backEndService: BackendService, public bsModalRef: BsModalRef, private _modalService: BsModalService,
        private _dataSourceService: DataSourceService, private router: Router) {
        this.candidateDataSource = new Observable((observer: Subscriber<string>) => {
            observer.next(this.candidateMappingForm.value['candidate']);
        }).pipe(
            mergeMap((token: string) => {
                return this.getStatesAsObservable(token)
            })
        );
        this.candidateMappingForm = new FormGroup({
            clientInteractionStatus: new FormControl('Mapped'),
            clientOnboardingStatus: new FormControl('Yet to Begin'),
            candidate: new FormControl(''),
            interviewDate: new FormControl(''),
            comment: new FormControl('', Validators.required)
        });
    }
    get interviewDate() { return this.candidateMappingForm.get('interviewDate'); }
    get comment() { return this.candidateMappingForm.get('comment'); }
    getStatesAsObservable(token: string): Observable<any[]> {
        const query = new RegExp(token, 'i');
        return of(
            this.allCandidates.filter((state: any) => {
                return query.test(state.candidateName);
            })
        );
    }
    ngOnDestroy(): void {
    }
    prepareAvailableCandidates(allCandidates: Array<ICandidate>): void {
        let query = "SELECT * FROM ? WHERE clientInteractionStatus='Available'";
        const result = alasql(query, [allCandidates]);
        this.allCandidates = result;
    }
    ngOnInit(): void {
        this._dataSourceService.getDataSource('allCandidates').subscribe((candidateResponse: any) => {
            if (candidateResponse) {
                this.prepareAvailableCandidates(candidateResponse);
            }
        })
        this._dataSourceService.getDataSource('selectedPosition').subscribe((selectedPosition: any) => {
            if (selectedPosition) {
                this.selectedPosition = selectedPosition;
            }
        })
        this.clientInteractionStatus = [];
        this.clientOnboardingStatus = [];
        this._dataSourceService.getDataSource('metadata').subscribe((metadata: IMetadata) => {
            if (metadata && metadata.CandidateInteractionStatus) {
                Object.keys(metadata.CandidateInteractionStatus).forEach((key: any) => {
                    const obj: any = {
                        key: key,
                        value: metadata.CandidateInteractionStatus[key]
                    }
                    this.clientInteractionStatus.push(obj);
                })
            }
            if (metadata && metadata.CandidateOnboardingStatus) {
                Object.keys(metadata.CandidateOnboardingStatus).forEach((key: any) => {
                    const obj: any = {
                        key: key,
                        value: metadata.CandidateOnboardingStatus[key]
                    }
                    this.clientOnboardingStatus.push(obj);
                })
            }
        })
        setTimeout(() => {
            if (this.candidate) {
                this.isEdit = false;
                this.candidateMappingForm.controls.clientInteractionStatus.setValue(this.candidate.candidateInteractionStatus);
                this.candidateMappingForm.controls.clientOnboardingStatus.setValue(this.candidate.candidateOnboardingStatus);
                this.candidateMappingForm.controls.candidate.setValue(this.candidate.candidateName);
            }
        }, 50);
    }
    mapCandidate(): void {
        if (!this.candidateMappingForm.get('candidate').touched && this.isEdit) {
            this.errorMsg = 'Please map a candidate';
            return;
        }
        if (this.candidateMappingForm.get('candidate').touched && this.candidateMappingForm.get('candidate').invalid) {
            this.errorMsg = 'Please map a candidate';
            return;
        }
        if (!this.selectedCandidate) {
            if (this.isEdit) {
                this.errorMsg = 'Please map a candidate';
                return;
            }
        }
        if (this.candidateMappingForm.value.comment === "") {
            this.errorMsg = "Please enter comment";
            return;
        }
        const mappingRequestParams: ICandidateMappingRequest = {
            clientInteractionStatus: this.candidateMappingForm.controls.clientInteractionStatus.value,
            clientOnboardingStatus: this.candidateMappingForm.controls.clientOnboardingStatus.value,
            recruiter: {
                id: (this.selectedPosition && this.selectedPosition.recruiter) ? this.selectedPosition.recruiter.id : (this.candidate && this.candidate.recruiter) ? this.candidate.recruiter.id : 0
            },
            interviewDate: (this.candidateMappingForm.value.interviewDate) ? moment(this.candidateMappingForm.value.interviewDate).format('YYYY-MM-DD') : '',
            comments: this.candidateMappingForm.value.comment,
            positionFulfilmentId: {
                candidateId: (this.selectedCandidate) ? this.selectedCandidate.id : (this.candidate) ? this.candidate.candidateId : null,
                positionId: (this.selectedPosition) ? this.selectedPosition.positionId : (this.candidate && this.candidate.positionFulfilmentId) ? this.candidate.positionFulfilmentId.positionId : null,
            }
        }
        if (this.candidate) {
            this.updateAlreadyMappedCandidate(mappingRequestParams);
        } else {
            this.mapFreshCandidate(mappingRequestParams);
        }
    }
    mapFreshCandidate(mappingRequestParams: ICandidateMappingRequest): void {
        this._backEndService.mapCandidateToPosition(mappingRequestParams).subscribe((mappedResponse: any) => {
            if (mappedResponse) {
                this.bsModalRef.hide();
                const initialState: ModalOptions = {
                    initialState: {
                        type: 'success',
                        message: 'Candidate Mapped Successfully !',
                        cb: this.handleMappedCandidateResponse.bind(this)
                    },
                    class: 'modal-wrapper'
                };
                this.bsModalRef = this._modalService.show(ModalComponent, initialState);
            }
        }, (error: any) => {
            if (error && error.error) {
                const initialState: ModalOptions = {
                    initialState: {
                        type: 'error',
                        message: error.error.message,
                        cb: this.handleMappedCandidateErrorResponse.bind(this)
                    },
                    class: 'modal-wrapper'
                };
                this.errorModalRef = this._modalService.show(ModalComponent, initialState);
            } else {
                if(error.status === 403) {
                    this.bsModalRef.hide();
                    this.router.navigate(['login']);
                }
            }
        })
    }
    updateAlreadyMappedCandidate(mappingRequestParams: ICandidateMappingRequest): void {
        this._backEndService.updateMappedCandidatesToPosition(mappingRequestParams).subscribe((mappedResponse: any) => {
            if (mappedResponse) {
                this.bsModalRef.hide();
                const initialState: ModalOptions = {
                    initialState: {
                        type: 'success',
                        message: 'Candidate Updated Successfully !',
                        cb: this.handleMappedCandidateResponse.bind(this)
                    },
                    class: 'modal-wrapper'
                };
                this.bsModalRef = this._modalService.show(ModalComponent, initialState);
            }
        }, (error: any) => {
            if (error && error.error) {
                const initialState: ModalOptions = {
                    initialState: {
                        type: 'error',
                        message: error.error.message,
                        cb: this.handleMappedCandidateErrorResponse.bind(this)
                    },
                    class: 'modal-wrapper'
                };
                this.errorModalRef = this._modalService.show(ModalComponent, initialState);
            } else if (error.status === 403) {
                this.bsModalRef.hide();
                this.router.navigate(['login']);
            }
        })
    }
    handleMappedCandidateErrorResponse(): void {
        this.errorModalRef?.hide();
    }
    handleMappedCandidateResponse(): void {
        this.cb.call();
    }
    changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }
    onSelect(event: TypeaheadMatch): void {
        this.selectedCandidate = event.item;
        this.candidateMappingForm.controls['candidate'].setValue(event.item.candidateName);
    }
    openCalendar(dp: any): void {
        setTimeout(() => {
            dp.show();
        }, 500);
    }
}
