import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/core/user.model';
import { ICreateCandidate } from '../models/core/candidate.model';
import { IPositions } from '../models/core/positions.model';
import { ICandidateMappingRequest } from '../models/request/candidate-mapping.model';
import { APPCONSTANTS } from '../constants/app.constant';

export interface IBackendService {
    login(user: IUser): Observable<any>;
    getPositions(): Observable<any>
}

@Injectable({
    providedIn: 'root'
})

export class BackendService implements IBackendService {
    constructor(private _httpClient: HttpClient) { }

    login(user: IUser): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this._httpClient.post(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.LOGIN, 
            user, httpOptions)
    }
    getRequestHeader(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('apiKey')
        })
    }
    getPositions(): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.POSITIONS, { headers: this.getRequestHeader() })
    }
    getMetadata(): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.METADATA, { headers: this.getRequestHeader() })
    }
    getCandidates(): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.CANDIDATES, { headers: this.getRequestHeader() })
    }
    createCandidate(candidate: ICreateCandidate): Observable<any> {
        return this._httpClient.post(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.CREATE_CANDIDATE, candidate, { headers: this.getRequestHeader() })
    }
    updateCandidate(id: number, candidate: ICreateCandidate): Observable<any> {
        return this._httpClient.put(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.UPDATE_CANDIDATE + '/' + id, candidate, { headers: this.getRequestHeader() })
    }
    createPosition(position: any): Observable<any> {
        return this._httpClient.post(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.CREATE_POSITION, position, { headers: this.getRequestHeader() })
    }
    updatePosition(id: number, position: any): Observable<any> {
        return this._httpClient.put(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.UPDATE_POSITION + '/' + id, position, { headers: this.getRequestHeader() })
    }
    getUser(name: string): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.USER + '?searchname='+ name, { headers: this.getRequestHeader() })
    }
    getPositionAuditTrail(positionId: string): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.POSITION_AUDIT_TRAIL + '/'+ positionId, { headers: this.getRequestHeader() })
    }
    getCandidateAuditTrail(candidateId: number): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.CANDIDATE_AUDIT_TRAIL + '/'+ candidateId, { headers: this.getRequestHeader() })
    }
    mapCandidateToPosition(params: ICandidateMappingRequest): Observable<any> {
        return this._httpClient.post(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.MAP_CANDIDATE_TO_POSITION, params, { headers: this.getRequestHeader() })
    }
    getMappedCandidatesToPosition(positionId: string): Observable<any> {
        return this._httpClient.get(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.MAPPED_CANDIATES_FOR_POSITION + '/'+ positionId, { headers: this.getRequestHeader() })
    }
    updateMappedCandidatesToPosition(params: ICandidateMappingRequest): Observable<any> {
        return this._httpClient.post(APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.UPDATE_MAPPED_CANDIDATE, params, { headers: this.getRequestHeader() })
    }
}
