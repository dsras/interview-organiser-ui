export class InterviewMetaData {
  type: string;
  interviewPanel: Array<string>;
  interviewStatus: string;
  interviewOutcome?: string;
  additional?: string;
  // * Additional params here as needed
  constructor(metaData: {
    panel: Array<string>;
    status: string;
    outcome?: string;
    additional?: string;
  }) {
    this.type = 'interview';
    this.interviewPanel = metaData.panel;
    this.interviewStatus = metaData.status;
    this.interviewOutcome = metaData.outcome;
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
