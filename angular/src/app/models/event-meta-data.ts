export class InterviewMetaData {
  type: string;
  interviewPanel?: Array<string>;
  interviewStatus?: string;
  interviewOutcome?: string;
  // * Additional params here as needed
  constructor(metaData: {
    type?: string;
    interviewPanel?: Array<string>;
    interviewStatus?: string;
    interviewOutcome?: string;
  }) {
    this.type = 'warning'
    this.interviewPanel = metaData.interviewPanel;
    this.interviewStatus = metaData.interviewStatus;
    this.interviewOutcome = metaData.interviewOutcome;
  }
}

export class AvailabilityMetaData {
  type: string;
  // * Additional params here as needed
  constructor() {
    this.type = 'info'
  }
}
