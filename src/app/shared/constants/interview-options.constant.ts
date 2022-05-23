export class InterviewOptions {
  private static _interviewStatus: Array<string> = [
    'Completed',
    'Candidate No Show',
    'Panel No Show',
  ];

  private static _interviewOutcome: Array<string> = [
    'Progressed',
    'Didnt Progress',
    'Hired',
  ];

  static getStatus(): Array<string> {
    return InterviewOptions._interviewStatus;
  }

  static getOutcome(): Array<string> {
    return InterviewOptions._interviewOutcome;
  }
}
