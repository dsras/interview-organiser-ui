import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateCandidate } from 'src/app/models/core/candidate.model';
import * as moment from 'moment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BackendService } from 'src/app/services/backend.service';
import { ModalComponent } from '../../modal/modal.component';
import { DataSourceService } from 'src/app/services/data-source.service';
import { IMetadata } from 'src/app/models/core/metadata.model';

@Component({
    selector: 'app-add-candidate',
    templateUrl: './add-candidate.component.html',
    styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
    isEditCandidate: boolean = false;
    candidateForm: any;
    allSkills: any;
    selectedCandidateSkills: string[] = [];
    candidateSkills: Array<any> = [];
    metadata: any;
    locations: Array<any> = [];
    datePickerConfig: Object = {
        isAnimated: true,
        adaptivePosition: true,
        returnFocusToInput: true,
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-default'
    };
    cb: any;
    selectedCandidate: ICreateCandidate = <any>null;
    showSubmitTooltip: boolean = false;
    onBoardingStatus: Array<any> = [];
    constructor(public modalRef: BsModalRef, private _backEndService: BackendService, private _modalService: BsModalService, private _dataSourceService: DataSourceService) {
        this.candidateForm = new FormGroup({
            candidateName: new FormControl('', Validators.required),
            candidateEmail: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl(''),
            experiencePrior: new FormControl(''),
            experienceYears: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
            experienceMonths: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
            joinDate: new FormControl(''),
            link: new FormControl(''),
            location: new FormControl('', Validators.required),
            offerDate: new FormControl(''),
            skill: new FormControl(''),
            accoliteOnboardingStatus: new FormControl('Offered', Validators.required),
            comments: new FormControl('')
        });
        this.removeSkill = this.removeSkill.bind(this);
    }
    get candidateName() { return this.candidateForm.get('candidateName'); }
    get candidateEmail() { return this.candidateForm.get('candidateEmail'); }
    get mobile() { return this.candidateForm.get('mobile');}
    get experienceYears() { return this.candidateForm.get('experienceYears'); }
    get experienceMonths() { return this.candidateForm.get('experienceMonths'); }
    get location() { return this.candidateForm.get('location'); }
    get skill() { return this.candidateForm.get('skill'); }
    get accoliteOnboardingStatus() { return this.candidateForm.get('accoliteOnboardingStatus');}
    get comments() { return this.candidateForm.get('comments');}
    ngOnInit(): void {
        this.candidateSkills = [];
        this._backEndService.getMetadata().subscribe((metaDataResponse: IMetadata) => {
            if (metaDataResponse) {
                this.metadata = metaDataResponse;
                if (this.metadata && this.metadata.Location) {
                    Object.keys(this.metadata.Location).forEach((item: string) => {
                        this.locations.push({
                            key: item,
                            value: this.metadata.Location[item]
                        })
                    })
                }
                if (this.metadata && this.metadata.AccoliteOnboardingStatus) {
                    Object.keys(this.metadata.AccoliteOnboardingStatus).forEach((item: any) => {
                        this.onBoardingStatus.push({
                            key: item,
                            value: this.metadata.AccoliteOnboardingStatus[item]
                        })
                    })
                }
                if (this.metadata && this.metadata.Skills) {
                    Object.keys(this.metadata.Skills).forEach((item: any) => {
                        this.candidateSkills.push(item);
                    })
                }
                if (this.selectedCandidate) {
                    this.isEditCandidate = true;
                }
                if (this.isEditCandidate) {
                    this.updateInitialCandidate();
                }
            }
        })
    }
    createCandidate(): void {
        if (this.candidateForm.invalid || this.selectedCandidateSkills.length === 0) {
            this.showSubmitTooltip = true;
            setTimeout(() => {
                this.showSubmitTooltip = false;
            }, 3000);
        } else {
            const candidate: ICreateCandidate = { ...this.candidateForm.value };
            candidate.skill = this.selectedCandidateSkills.map((skill: any) => {
                return this.metadata.Skills[skill];
            });
            candidate.joinDate = '';
            candidate.offerDate = '';
            if (this.candidateForm.value && this.candidateForm.value.joinDate && this.candidateForm.value.joinDate !== '') {
                candidate.joinDate = moment(this.candidateForm.value.joinDate).format('YYYY-MM-DD');
            }
            if (this.candidateForm.value && this.candidateForm.value.offerDate && this.candidateForm.value.offerDate !== '') {
                candidate.offerDate = moment(this.candidateForm.value.offerDate).format('YYYY-MM-DD');
            }
            candidate.experiencePrior = this.candidateForm.value.experienceYears * 12 + this.candidateForm.value.experienceMonths;
            delete candidate.experienceYears;
            delete candidate.experienceMonths;
            this.modalRef.hide();
            if (this.isEditCandidate) {
                candidate.clientInteractionStatus = this.selectedCandidate.clientInteractionStatus;
                candidate.clientOnboardingStatus = this.selectedCandidate.clientOnboardingStatus;
                if (this.selectedCandidate && this.selectedCandidate.id) {
                    this._backEndService.updateCandidate(this.selectedCandidate.id, candidate).subscribe((updateCandidateResponse: any) => {
                        if (updateCandidateResponse) {
                            const initialState: ModalOptions = {
                                initialState: {
                                    type: 'success',
                                    message: 'Candidate Updated Successfully !',
                                    cb: this.handleCreatedCandidateResponse.bind(this)
                                },
                                class: 'modal-wrapper'
                            };
                            this.modalRef = this._modalService.show(ModalComponent, initialState);
                        }
                    })
                }
            } else {
                this._backEndService.createCandidate(candidate).subscribe((createCandidateResponse: any) => {
                    if (createCandidateResponse) {
                        this.modalRef?.hide();
                        const initialState: ModalOptions = {
                            initialState: {
                                type: 'success',
                                message: 'Candidate Created Successfully !',
                                cb: this.handleCreatedCandidateResponse.bind(this)
                            },
                            class: 'modal-wrapper'
                        };
                        this.modalRef = this._modalService.show(ModalComponent, initialState);
                    }
                })
            }
        }
    }
    handleCreatedCandidateResponse(): void {
        if (this.isEditCandidate) {
            this._dataSourceService.updateDataSource('updateCandidate', true);
        } else {
            this.cb.call();
        }
    }
    onSkillTypeAheadSelect(event: any): void {
        if (event && event.value) {
            const index: number = this.selectedCandidateSkills.indexOf(event.value);
            if (index === -1) {
                this.selectedCandidateSkills.push(event.value);
            }
            this.candidateForm.controls['skill'].setValue('')
        }
    }
    removeSkill(skill: string) {
        const index: number = this.selectedCandidateSkills.indexOf(skill);
        if (index >= 0) {
            this.selectedCandidateSkills.splice(index, 1);
        }
    }
    updateInitialCandidate() {
        this.candidateForm.controls['candidateName'].setValue(this.selectedCandidate.candidateName);
        this.candidateForm.controls['candidateEmail'].setValue(this.selectedCandidate.candidateEmail);
        if (this.selectedCandidate.candidateDetails) {
            if (this.selectedCandidate.candidateDetails.experience) {
                this.candidateForm.controls['experiencePrior'].setValue(this.selectedCandidate.candidateDetails.experience);
                const months = this.selectedCandidate.candidateDetails.experience % 12;
                const years = (this.selectedCandidate.candidateDetails.experience - months) / 12;
                this.candidateForm.controls['experienceYears'].setValue(years);
                this.candidateForm.controls['experienceMonths'].setValue(months);
            }
        }
        this.candidateForm.controls['joinDate'].setValue(this.selectedCandidate.joinDate);
        this.candidateForm.controls['link'].setValue(this.selectedCandidate.link);
        this.candidateForm.controls['location'].setValue(this.selectedCandidate.location);
        this.candidateForm.controls['offerDate'].setValue(this.selectedCandidate.offerDate);
        this.candidateForm.controls['accoliteOnboardingStatus'].setValue(this.selectedCandidate.accoliteOnboardingStatus);
        this.candidateForm.controls['comments'].setValue(this.selectedCandidate.comments);
        this.candidateForm.controls['mobile'].setValue(this.selectedCandidate.mobile);
        this.selectedCandidate.skill.forEach((element: string) => {
            const skill = this.getKeyByValue(this.metadata.Skills, element);
            if (skill) {
                this.selectedCandidateSkills.push(skill)
            }
        });
    }
    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === value)?.toString();
    }
}
