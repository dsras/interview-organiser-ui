export class EventMetaData {
  type?: string;
  interviewPanel?: Array<string>;
  interviewStatus?: string;
  interviewOutcome?: string;
  // * Additional params here as needed
  constructor(metaData: {
    type?: string;
    interviewPanel?: Array<string>;
    interviewStatus?: string;
    interviewOutcome?: string;
    // * Addtional params here as needed
  }) {
    this.interviewPanel = metaData.interviewPanel;
    this.interviewStatus = metaData.interviewStatus;
    this.interviewOutcome = metaData.interviewOutcome;
    if (this.interviewPanel) {
      this.type = 'warning'
    }
    // * Additional params here as needed
  }
}
