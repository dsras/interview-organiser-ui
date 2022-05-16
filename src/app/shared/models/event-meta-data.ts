export class InterviewMetaData {
  type?: string;
  interviewPanel?: Array<string>;
  interviewStatus?: string;
  interviewOutcome?: string;
  additional?: string;
  // * Additional params here as needed
  constructor(metaData: {
    interviewPanel: Array<string>;
    interviewStatus: string;
    interviewOutcome: string;
    additional: string;
  }) {
    this.type = 'interview';
    this.interviewPanel = metaData.interviewPanel;
    this.interviewStatus = metaData.interviewStatus;
    this.interviewOutcome = metaData.interviewOutcome;
    this.additional = metaData.additional;
  }
}

export class AvailabilityMetaData {
  type: string;
  // * Additional params here as needed
  constructor() {
    this.type = 'availability';
  }
}
