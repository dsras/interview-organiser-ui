import { IUserRequest } from "../request/user.model";

export interface IAuditTrail {
    comments: string,
    createdBy: string,
    createdDate: string,
    id: number,
    updatedBy: string,
    updatedOn: string
}

export interface IPositions {
    account: string,
    auditTrail: IAuditTrail,
    buCode: string,
    clientHiringManager: string,
    description: string,
    experienceLevel: string,
    fgId: string,
    location: string,
    positionId: string,
    priority: string,
    recruiter: IUserRequest,
    resourceManager: IUserRequest
    techHead: IUserRequest,
    title: string,
    skills: Array<string>,
    department: string,
    status: string,
    closeBy?: string
}