export interface ICandidate {
    id: number,
    candidateName: string,
    candidateEmail: string,
    experience: number,
    joinDate: string,
    link: string,
    location: string,
    offerDate: string,
    skill: Array<string>,
    clientInteractionStatus: string,
    clientOnboardingStatus: string
}

export interface ICreateCandidate {
    candidateName: string,
    candidateEmail: string,
    skill: Array<string>,
    location: string,
    link: string,
    joinDate: string,
    offerDate: string,
    experiencePrior: number,
    experienceMonths?: number,
    experienceYears?: number,
    clientInteractionStatus?: string,
    clientOnboardingStatus?: string,
    accoliteOnboardingStatus?: string,
    id?: number,
    candidateDetails?: {
        experience: number
    }
    comments: string,
    mobile: number
}
