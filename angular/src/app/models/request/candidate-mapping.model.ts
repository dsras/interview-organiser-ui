import { IUserRequest } from './user.model';

export interface IPositionFulfilmentRequest {
    candidateId: number,
    positionId: string
}

export interface ICandidateMappingRequest {
    clientInteractionStatus: string,
    clientOnboardingStatus: string,
    recruiter: IUserRequest,
    interviewDate: string,
    comments: string,
    positionFulfilmentId: IPositionFulfilmentRequest
}
