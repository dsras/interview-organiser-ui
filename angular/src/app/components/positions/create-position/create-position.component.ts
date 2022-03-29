import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BackendService } from 'src/app/services/backend.service';
import * as moment from 'moment';
import { Observable, of, Subscriber } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ModalComponent } from '../../modal/modal.component';
import { DataSourceService } from 'src/app/services/data-source.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// Need to move to model
export interface ICreatePositionFormConfig {
    accounts: Array<any>,
    bus: Array<any>,
    departments: Array<any>,
    locations: Array<any>,
    priorities: Array<any>,
    experienceLevels: Array<any>
}
@Component({
    selector: 'app-create-position',
    templateUrl: './create-position.component.html',
    styleUrls: ['./create-position.component.scss']
})
export class CreatePositionComponent implements OnInit {
    createPositionForm: any;
    metaData: any;
    selectedData: any;
    modalType: any;
    formData: ICreatePositionFormConfig = <any>null;
    allSkills: Array<any> = [];
    allSkillsServerSide: Array<any> = [];
    selectedSkills: Array<any> = [];
    datePickerConfig: Object = {
        isAnimated: true,
        adaptivePosition: true,
        returnFocusToInput: true,
        dateInputFormat: 'YYYY-MM-DD',
        containerClass: 'theme-default'
    };
    allUsers: Array<any> = [];
    resourceManagerDataSource: Observable<any[]>;
    techHeadDataSource: Observable<any[]>;
    recruiterDataSource: Observable<any[]>
    typeaheadLoading?: boolean;
    selectedResourceManager: number = 0;
    isResourceManagerSelected: boolean = false;
    selectedTechHead: number = 0;
    isTechHeadSelected: boolean = false;
    selectedRecruiter: number = 0;
    isRecruiterSelected: boolean = false;
    showSubmitTooltip: boolean = false;

    // [Multi Select Dropdown]
    dropdownSettings:IDropdownSettings = {
        singleSelection: false,
        idField: 'key',
        textField: 'value',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };
    constructor(public bsModalRef: BsModalRef, private _backEndService: BackendService, private _modalService: BsModalService, private _dataSourceService: DataSourceService) {
        this.createPositionForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl(''),
            account: new FormControl('', Validators.required),
            buCode: new FormControl('', Validators.required),
            department: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            clientHiringManager: new FormControl('', Validators.required),
            priority: new FormControl('', Validators.required),
            skills: new FormControl(''),
            experienceLevel: new FormControl('', Validators.required),
            fgId: new FormControl(''),
            closeBy: new FormControl(''),
            recruiter: new FormControl(''),
            techHead: new FormControl(''),
            resourceManager: new FormControl(''),
            vacancy: new FormControl(1, Validators.required)
        });

        this.resourceManagerDataSource = new Observable((observer: Subscriber<string>) => {
            observer.next(this.createPositionForm.value['resourceManager']);
        }).pipe(
            mergeMap((token: string) => {
                return this.getStatesAsObservable(token)
            })
        );
        this.techHeadDataSource = new Observable((observer: Subscriber<string>) => {
            observer.next(this.createPositionForm.value['techHead']);
        }).pipe(
            mergeMap((token: string) => {
                return this.getStatesAsObservable(token)
            })
        );
        this.recruiterDataSource = new Observable((observer: Subscriber<string>) => {
            observer.next(this.createPositionForm.value['recruiter']);
        }).pipe(
            mergeMap((token: string) => {
                return this.getStatesAsObservable(token)
            })
        );
        this.createPositionForm.get("recruiter").valueChanges.subscribe((x: string) => {
            this.isRecruiterSelected = x.length > 0;
        });
        this.createPositionForm.get("techHead").valueChanges.subscribe((x: string) => {
            this.isTechHeadSelected = x.length > 0;
        });
        this.createPositionForm.get("resourceManager").valueChanges.subscribe((x: string) => {
            this.isResourceManagerSelected = x.length > 0;
        });
    }
    getStatesAsObservable(token: string): Observable<any[]> {
        const query = new RegExp(token, 'i');
        return of(
            this.allUsers.filter((state: any) => {
                return query.test(state.name);
            })
        );
    }
    changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }
    onResourceManagerSelected(event: any): any {
        if (event && event.item) {
            this.selectedResourceManager = event.item.id;
        }
    }
    onTechHeadSelected(event: any): any {
        if (event && event.item) {
            this.selectedTechHead = event.item.id;
        }
    }
    onRecruiterSelected(event: any): any {
        if (event && event.item) {
            this.selectedRecruiter = event.item.id;
        }
    }
    get title() { return this.createPositionForm.get('title'); }
    get account() { return this.createPositionForm.get('account'); }
    get buCode() { return this.createPositionForm.get('buCode'); }
    get department() { return this.createPositionForm.get('department'); }
    get location() { return this.createPositionForm.get('location'); }
    get clientHiringManager() { return this.createPositionForm.get('clientHiringManager'); }
    get priority() { return this.createPositionForm.get('priority'); }
    get skills() { return this.createPositionForm.get('skills'); }
    get experienceLevel() { return this.createPositionForm.get('experienceLevel'); }
    get recruiter() { return this.createPositionForm.get('recruiter'); }
    get techHead() { return this.createPositionForm.get('techHead'); }
    get resourceManager() { return this.createPositionForm.get('resourceManager'); }
    get vacancy() { return this.createPositionForm.get('vacancy'); }
    fetchDropdownData(obj: any): Array<any> {
        const arr: Array<any> = [];
        Object.keys(obj).forEach((value: string) => {
            arr.push({
                key: obj[value],
                value: value
            })
        })
        return arr;
    }
    ngOnInit(): void {
        if (this.modalType === 'edit') {
            this.createPositionForm.controls['title'].setValue(this.selectedData.title);
            this.createPositionForm.controls['description'].setValue(this.selectedData.description);
            this.createPositionForm.controls['account'].setValue(this.selectedData.account);
            this.createPositionForm.controls['buCode'].setValue(this.selectedData.buCode);
            this.createPositionForm.controls['department'].setValue(this.selectedData.department);
            // this.createPositionForm.controls['location'].setValue([{key: 'Delhi', value: 'Delhi'}, {key: 'Pune', value: 'Pune'}]);
            this.createPositionForm.controls['clientHiringManager'].setValue(this.selectedData.clientHiringManager);
            this.createPositionForm.controls['priority'].setValue(this.selectedData.priority);
            // this.createPositionForm.controls['experienceLevel'].setValue(this.selectedData.experienceLevel);
            this.createPositionForm.controls['fgId'].setValue(this.selectedData.fgId);
            this.createPositionForm.controls['closeBy'].setValue(this.selectedData.closeBy);
            this.createPositionForm.controls['recruiter'].setValue(this.selectedData.recruiter.name);
            this.createPositionForm.controls['techHead'].setValue(this.selectedData.techHead.name);
            this.createPositionForm.controls['resourceManager'].setValue(this.selectedData.resourceManager.name);
            this.createPositionForm.controls['vacancy'].setValue(this.selectedData.vacancy);
            this.selectedSkills = this.selectedData.skills;
        }
        this._dataSourceService.getDataSource('metadata').subscribe((metaData: any) => {
            if (metaData) {
                this.metaData = metaData;

                // Apply selected Location
                let locations: Array<any> = [];
                if (this.metaData.Location) {
                    locations = this.fetchDropdownData(this.metaData.Location);
                    if (this.modalType === 'edit') {
                        if (this.selectedData.location) {
                            const allSelectedLoc: Array<any> = [];
                            const allLocations = this.selectedData.location.split(',');
                            locations.forEach((loc: any) => {
                                allLocations.forEach((selected: string) => {
                                    if (loc && loc.value === selected) {
                                        allSelectedLoc.push(loc);
                                    }
                                })
                            })
                            this.createPositionForm.controls['location'].setValue(allSelectedLoc);
                        }
                    }
                }
                // Apply Selected Experience Level
                let experienceLevels: Array<any> = [];
                if (this.metaData.ExperienceLevel) {
                    experienceLevels = this.fetchDropdownData(this.metaData.ExperienceLevel);
                    if (this.modalType === 'edit') {
                        if (this.selectedData.experienceLevel) {
                            const allSelectedExp: Array<any> = [];
                            const allExps = this.selectedData.experienceLevel.split(',');
                            experienceLevels.forEach((exp: any) => {
                                allExps.forEach((selected: string) => {
                                    if (exp && exp.value === selected) {
                                        allSelectedExp.push(exp);
                                    }
                                })
                            })
                            this.createPositionForm.controls['experienceLevel'].setValue(allSelectedExp);
                        }
                    }
                }

                this.formData = {
                    accounts: (this.metaData.Account) ? this.fetchDropdownData(this.metaData.Account) : [],
                    bus: (this.metaData.Bu) ? this.fetchDropdownData(this.metaData.Bu) : [],
                    departments: (this.metaData.Department) ? this.fetchDropdownData(this.metaData.Department) : [],
                    locations: (this.metaData.Location) ? locations : [],
                    priorities: (this.metaData.Priority) ? this.fetchDropdownData(this.metaData.Priority) : [],
                    experienceLevels: (this.metaData.ExperienceLevel) ? experienceLevels : []
                }
                this.allSkills = [];
                this.allSkillsServerSide = [];
                if (this.metaData && this.metaData.Skills) {
                    Object.keys(this.metaData.Skills).forEach((skill: string) => {
                        this.allSkills.push(skill);
                        this.allSkillsServerSide.push(this.metaData.Skills[skill]);
                    })
                }
            }
        })
        this._dataSourceService.getDataSource('users').subscribe((userResponse: Array<any>) => {
            if (userResponse) {
                this.allUsers = userResponse;
                this.allUsers.forEach((user: any) => {
                    if (this.selectedData) {
                        if (user.name === this.selectedData.recruiter.name) {
                            this.selectedRecruiter = user.id;
                        }
                        if (user.name === this.selectedData.resourceManager.name) {
                            this.selectedResourceManager = user.id;
                        }
                        if (user.name === this.selectedData.techHead.name) {
                            this.selectedTechHead = user.id;
                        }
                    }
                })
            }
        })
    }
    onSkillTypeAheadSelect(event: any): void {
        if (event && event.value) {
            const index: number = this.selectedSkills.indexOf(event.value);
            if (index === -1) {
                this.selectedSkills.push(event.value);
            }
            this.createPositionForm.controls['skills'].setValue('')
        }
    }
    removeSkill(skill: string) {
        const index: number = this.selectedSkills.indexOf(skill);
        if (index >= 0) {
            this.selectedSkills.splice(index, 1);
        }
    }
    createPosition(): void {
        if (this.createPositionForm.invalid || !this.isRecruiterSelected || !this.isTechHeadSelected || !this.isResourceManagerSelected || this.selectedSkills.length === 0) {
            this.showSubmitTooltip = true;
            setTimeout(() => {
                this.showSubmitTooltip = false;
            }, 3000);
        } else {
            const position: any = { ...this.createPositionForm.value };
            if (this.selectedSkills.length > 0) {
                position.skills = [];
                this.selectedSkills.forEach((skill: string) => {
                    const index = this.allSkills.indexOf(skill);
                    if (index >= 0) {
                        position.skills.push(this.allSkillsServerSide[index]);
                    }
                })
            }
            position.closeBy = '';
            if (this.createPositionForm.value && this.createPositionForm.value.closeBy && this.createPositionForm.value.closeBy !== '') {
                position.closeBy = moment(this.createPositionForm.value.closeBy).format('YYYY-MM-DD');
            }
            if (this.selectedResourceManager) {
                position.resourceManager = {
                    id: this.selectedResourceManager
                }
            }
            if (this.selectedRecruiter) {
                position.recruiter = {
                    id: this.selectedRecruiter
                }
            }
            if (this.selectedTechHead) {
                position.techHead = {
                    id: this.selectedTechHead
                }
            }
            // Apply Locations
            const locations = [...position.location];
            position.location = '';
            const selectedLoc: Array<any> = [];
            locations.forEach((loc: any) => {
                selectedLoc.push(loc.value);
            })
            position.location = selectedLoc.join(',');

            // Apply Experience level
            const experienceLevels = [...position.experienceLevel];
            position.experienceLevel = '';
            const selectedExp: Array<any> = [];
            experienceLevels.forEach((exp: any) => {
                selectedExp.push(exp.value);
            })
            position.experienceLevel = selectedExp.join(',');

            if (this.modalType === 'edit') {
                if (this.selectedData && this.selectedData.positionId) {
                    this._backEndService.updatePosition(this.selectedData.positionId, position).subscribe((updatePositionResponse: any) => {
                        if (updatePositionResponse) {
                            this.bsModalRef.hide();
                            const initialState: ModalOptions = {
                                initialState: {
                                    type: 'success',
                                    message: 'Position Updated Successfully !',
                                    cb: this.handleCreateCandidateResponse.bind(this)
                                },
                                class: 'modal-wrapper'
                            };
                            this.bsModalRef = this._modalService.show(ModalComponent, initialState);
                        }
                    }, (error) => {
                        if (error.status) {
                            this.bsModalRef.hide();
                            const initialState: ModalOptions = {
                                initialState: {
                                    type: 'error',
                                    message: 'Not able Update position'
                                },
                                class: 'modal-wrapper'
                            };
                            this.bsModalRef = this._modalService.show(ModalComponent, initialState);
                        }
                    })
                }
            } else {
                this._backEndService.createPosition(position).subscribe((createPositionResponse: any) => {
                    if (createPositionResponse) {
                        this.bsModalRef.hide();
                        const initialState: ModalOptions = {
                            initialState: {
                                type: 'success',
                                message: 'Position Created Successfully !',
                                cb: this.handleCreateCandidateResponse.bind(this)
                            },
                            class: 'modal-wrapper'
                        };
                        this.bsModalRef = this._modalService.show(ModalComponent, initialState);
                    }
                }, (error) => {
                    if (error.status) {
                        this.bsModalRef.hide();
                        const initialState: ModalOptions = {
                            initialState: {
                                type: 'error',
                                message: 'Not able to create position !'
                            },
                            class: 'modal-wrapper'
                        };
                        this.bsModalRef = this._modalService.show(ModalComponent, initialState);
                    }
                })
            }
        }
    }
    handleCreateCandidateResponse(): void {
        this._dataSourceService.updateDataSource('addPosition', true);
    }
    onMultiSelectDropdownSelect(event: any, type: string): void {
        if (type === 'location') {
            const value = this.createPositionForm.value['location'];
            if (value !== '') {
                // this.createPositionForm.controls['location'].setValue(value + ',' + event.value);
            } else {
                // this.createPositionForm.controls['location'].setValue(event.value);
            }
        } else if (type === 'experience') {
            const value = this.createPositionForm.value['experienceLevel'];
            if (value !== '') {
                // this.createPositionForm.controls['experienceLevel'].setValue(value + ',' + event.value);
            } else {
                // this.createPositionForm.controls['experienceLevel'].setValue(event.value);
            }
        }
    }
    onMultiSelectDropdownSelectAll(event: any, type: string): void {
        const values: Array<any> = [];
        event.forEach((ev: any)=> {
            values.push(ev.value);
        })
        if (type === 'location') {
            // this.createPositionForm.controls['location'].setValue(values.join(','));
        } else if (type === 'experience') {
            // this.createPositionForm.controls['experienceLevel'].setValue(values.join(','));
        }
    }
}
