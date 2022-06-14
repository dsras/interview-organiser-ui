import { AvailabilityForInterviews } from './types';

export interface AvailabilityRangeFormValue {
  firstDate: string;
  lastDate: string;
  startTime: string;
  endTime: string;
}

export interface CreateInterviewFormValue {
  interviewSelected: AvailabilityForInterviews;
  additionalInformation: string;
  startTime: string;
}

export interface FindSlotFormValue {
  startTime: string;
  endTime: string;
  firstDate: string;
  lastDate: string;
  skills: { skillType: string; skillLevel: string };
}

export interface AvailabilityArrayFormValue {
  startTime: string;
  endTime: string;
  weeks: number;
  days: Array<{weekday: string}>;
}

export interface Weekday {
  weekday: string;
}
