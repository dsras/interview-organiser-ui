export const interviewStatusOptions: Array<string> = [
  'Completed',
  'Candidate No Show',
  'Panel No Show',
  'Pending'
];

export const interviewOutcomeOptions: Array<string> = [
  'Progressed',
  "Didn't Progress",
  'Hired',
  'Awaiting Completion'
];

export enum statusOptions {
  completed = 'Complete',
  candidateNoShow = 'Candidate No Show' ,
  panelNoShow = 'Panel No Show',
  pending = 'Pending',
  S1 = 'R1',
  S2 = 'R2',
  S3 = 'Sponsor'
}
export enum outcomeOptions {
  completed = 'Completed',
  progressed = 'Progressed',
  didNotProgress = "Didn't Progress",
  awaitingCompletion = 'Awaiting Completion'
}
