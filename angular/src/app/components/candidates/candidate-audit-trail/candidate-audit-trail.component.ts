import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BackendService } from 'src/app/services/backend.service';

@Component({
    selector: 'app-candidate-audit-trail',
    templateUrl: './candidate-audit-trail.component.html',
    styleUrls: ['./candidate-audit-trail.component.scss']
})
export class CandidateAuditTrailComponent implements OnInit {
    id: number = 0;
    candidateName: string = '';
    auditTrailData: Array<any> = [];
    errorMsg: string = 'No Audit Trail Available';
    isError: boolean = true;
    constructor(public modalRef: BsModalRef, private _backEndService: BackendService) { }

    ngOnInit(): void {
        this._backEndService.getCandidateAuditTrail(this.id).subscribe((candidateAuditTrailResponse: any) => {
            if (candidateAuditTrailResponse) {
                this.auditTrailData = candidateAuditTrailResponse;
                if (this.auditTrailData && this.auditTrailData.length > 0) {
                    this.isError = false;
                    this.candidateName = this.auditTrailData[0].candidateName;
                    this.auditTrailData.forEach((data: any) => {
                        if (data && data.updateOn) {
                            if (data.updateOn) {
                                data.updateOn = moment(data.updateOn).format('DD MMM YYYY');
                            }
                            if (data.interviewDate) {
                                data.interviewDate = moment(data.interviewDate).format('DD MMM YYYY');
                            }
                        }
                    })
                }
            }
        })
    }

    getStatus(value: string): string {
        if (value === 'Offered' || value === 'Mapped' || value === 'Client Interview InProgress' || value === 'Yet to Begin' || value === 'Interview Ready' || value === 'Inteview InProgress') {
            return 'amber';
        } else if (value === 'Available') {
            return 'primary';
        } else if (value === 'Drop Out' || value === 'Interview Rejected') {
            return 'red';
        } else if (value === 'Interview Selected' || value === 'Onboarding' || value === 'Started') {
            return 'green';
        }
        return '';
    }
    getWrapper(value: string): string {
        if (value === 'Client Interview InProgress' || value === 'Interview Rejected' || value === 'Interview Selected' || value === 'Interview InProgress' || value === 'Interview Ready') {
            return 'table';
        }
        return '';
    }
}
