import { AvailabilityForInterviews } from "./types";

export interface AvailabilityFormValue {
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
