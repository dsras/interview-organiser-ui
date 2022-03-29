import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { RendererService } from './renderer.service';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class GridConfigService {

    constructor(private _rendererService: RendererService) { }
    getCandidateGridColDef(): Array<ColDef> {
        return [{
            field: 'candidateName',
            headerName: 'Name',
            width: 160,
            sortable: true,
            cellRenderer: 'nameRenderer',
        }, {
            field: 'candidateEmail',
            headerName: 'Email',
            width: 190,
            sortable: true,
        }, {
            field: 'experience',
            headerName: 'Experience',
            width: 65,
            sortable: true,
            cellRenderer: function(candidate: any) {
                if (candidate && candidate.data && candidate.data.candidateDetails && candidate.data.candidateDetails.experience) {
                    const years = Math.floor(candidate.data.candidateDetails.experience / 12);
                    const months = candidate.data.candidateDetails.experience - (12 * years);
                    return years + 'Y  ' + months + 'M';
                }
                return '';
            }
        }, {
            field: 'aging',
            headerName: 'Aging',
            width: 50,
            sortable: true,
            cellRenderer: 'agingRenderer',
            comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
                if (nodeA && nodeB && nodeA.data && nodeB.data && nodeA.data && nodeA.data.candidateDetails && nodeB.data.candidateDetails) {
                    if(nodeA.data.candidateDetails.Age === nodeB.data.candidateDetails.Age) {
                        return 0;
                    } else {
                        return (nodeA.data.candidateDetails.Age > nodeB.data.candidateDetails.Age) ? 1 : -1;
                    }
                }
                return 0;
            }
        },{
            field: 'skill',
            headerName: 'Skills',
            width: 200,
            sortable: true,
            cellRenderer: 'skillRenderer'
        }, {
            field: 'location',
            headerName: 'Location',
            width: 75,
            sortable: true,
        }, {
            field: 'positionId',
            headerName: 'Position ID',
            width: 110,
            sortable: true,
        },{
            field: 'account',
            headerName: 'Account',
            width: 70,
            sortable: true,
        },{
            field: 'department',
            headerName: 'Department',
            width: 70,
            sortable: true,
        },{
            field: 'joinDate',
            headerName: 'Joined Date',
            width: 78,
            sortable: true,
            cellRenderer: this.dateRenderer.bind(this)
        }, {
            field: 'mobile',
            headerName: 'Mobile',
            width: 80
        },{
            field: 'offerDate',
            headerName: 'Offer Date',
            width: 78,
            sortable: true,
            cellRenderer: this.dateRenderer.bind(this)
        }, {
            field: 'accoliteOnboardingStatus',
            headerName: 'Accolite Onboarding Status',
            width: 125,
            sortable: true,
            pinned: 'right',
            cellRenderer: 'statusRenderer'
        }, {
            field: 'clientInteractionStatus',
            headerName: 'Client Interaction Status',
            width: 125,
            sortable: true,
            pinned: 'right',
            cellRenderer: 'statusRenderer'
        }, {
            field: 'clientOnboardingStatus',
            headerName: 'Client Onboarding Status',
            width: 120,
            sortable: true,
            pinned: 'right',
            cellRenderer: 'statusRenderer'
        }, {
            field: 'edit',
            headerName: '',
            width: 40,
            pinned: 'right',
            cellRenderer: 'editRenderer'
        }];
    }
    getCandidateGridOutputColumns(): Array<string> {
        return ['candidateName', 'candidateEmail', 'location', 'positionId', 'account', 'department', 'mobile', 'accoliteOnboardingStatus', 'clientInteractionStatus', 'clientOnboardingStatus'];
    }
    getCandidateGridExceptionColumns(): Array<string> {
        return ['AGE(candidateDetails) AS age', 'EXPERIENCE(candidateDetails) AS experience', 'SKILL(skill) AS Skills'];
    }
    getPositionListingConfig(): Array<ColDef> {
        return [{
            field: 'positionId',
            headerName: 'Position ID',
            width: 140
        }, {
            field: 'account',
            headerName: 'Account',
            width: 60,
            sortable: true,
        }, {
            field: 'title',
            headerName: 'Title',
            flex: 1
        }, {
            field: 'location',
            headerName: 'Location',
            width: 70,
            sortable: true,
        }, {
            field: 'priority',
            headerName: 'Priority',
            width: 60,
            sortable: true,
        }];
    }
    getMappedCandidatesConfig(): Array<ColDef> {
        return [{
            field: 'candidateName',
            headerName: 'Candidate Name',
            width: 140,
            cellRenderer: 'nameRenderer'
        }, {
            field: 'interviewDate',
            headerName: 'Interview Date',
            width: 76,
            sortable: true,
            cellRenderer: this.dateRenderer.bind(this)
        }, {
            field: 'comments',
            headerName: 'Comments',
            flex: 1
        }, {
            field: 'candidateInteractionStatus',
            headerName: 'Interaction Status',
            width: 87,
            sortable: true,
            cellRenderer: 'statusRenderer'
        }, {
            field: 'candidateOnboardingStatus',
            headerName: 'Onboarding Status',
            width: 87,
            sortable: true,
            cellRenderer: 'statusRenderer'
        }, {
            field: 'edit',
            headerName: '',
            width: 30,
            cellRenderer: 'mappedCandidateEditRenderer',
        }];
    }
    dateRenderer(row: any): any {
        if (row.value) {
            return moment(row.value).format('DD MMM YYYY');
        }
        return '';
    }
    getAuditTrailConfig(): Array<ColDef> {
        return [{
            field: 'candidateName',
            headerName: 'Candidate Name',
            width: 100
        }, {
            field: 'interviewDate',
            headerName: 'Interview Date',
            width: 75,
            sortable: true,
            cellRenderer: this.dateRenderer.bind(this)
        }, {
            field: 'comments',
            headerName: 'Comments',
            flex: 1
        }, {
            field: 'clientInteractionStatus',
            headerName: 'Client Interaction Status',
            width: 87,
            sortable: true,
            cellRenderer: 'statusRenderer'
        }, {
            field: 'clientOnboardingStatus',
            headerName: 'Client Onboarding Status',
            width: 87,
            sortable: true,
            cellRenderer: 'statusRenderer'
        }, {
            field: 'updateOn',
            headerName: 'Updated Date',
            width: 75,
            sortable: true,
            cellRenderer: this.dateRenderer.bind(this)
        }, {
            field: 'updatedBy',
            headerName: 'Updated By',
            width: 87,
            sortable: true
        }]
    }
}
