import { ISystemUser } from "./user.model";

export interface IMetadata {
    account: Array<string>,
    bu: Array<string>,
    priority: Array<string>,
    source: Array<string>,
    Skills: Array<string>,
    userMetadata: ISystemUser,
    CandidateInteractionStatus?: any,
    CandidateOnboardingStatus?: any
}