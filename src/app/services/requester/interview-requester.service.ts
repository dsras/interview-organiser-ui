import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  Interview,
  InterviewReturn,
  InterviewTableReturn,
  StatusUpdate,
} from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { InterviewMetaData } from 'src/app/shared/models/event-meta-data';
import { CalendarColors } from 'src/app/shared/constants/colours.constant';
import { DateToStringService } from '../date-to-string.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterviewRequesterService {
  constructor(
    private requester: Requester,
    private dateFormatter: DateToStringService
  ) {}

  stringTimeAdd(input: string, add: number) {
    let splits = input.split(':');
    let hour = Number.parseInt(splits[0]);
    hour = hour + add;
    let newStringHour = hour.toString();
    if (newStringHour.length < 2) {
      newStringHour = '0' + newStringHour;
    }
    return newStringHour + ':' + splits[1];
  }

  dateToStringTime(date: Date): string {
    return this.dateFormatter.dateToStringTime(date);
  }

  dateToStringDate(date: Date): string {
    return this.dateFormatter.dateToStringDate(date);
  }

  outputInterviewEvent(element: InterviewReturn): CalendarEventInterview {
    const start = new Date(element.date);
    const end = new Date(element.date);
    const int_id = element.interview_id;
    const times1 = element.start_time.split(':');
    const times2 = element.end_time.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const newInterviewData = new InterviewMetaData({
      interviewPanel: element.interviewers,
      interviewOutcome: element.outcome,
      interviewStatus: element.status,
      additional: element.additional_info,
    });

    const newInterview: CalendarEventInterview = {
      id: int_id,
      start: start,
      end: end,
      title: 'interview',
      color: CalendarColors.yellow,
      meta: newInterviewData,
    };
    return newInterview;
  }

  // ? Is the formDecomp an array of the form values?
  addInterviewForm(formInput: string, additional: string, startTime: Date) {
    const formDecomp: string[] = formInput.split(' ');
    const dateString: string = formDecomp[1];
    let startTimeString: string;
    let endTimeString = '';
    if (startTime.toString() != '') {
      startTimeString = this.dateToStringTime(startTime);

      startTime.setHours(startTime.getHours() + 1);

      endTimeString = this.dateToStringTime(startTime);
    } else {
      startTimeString = formDecomp[3];
      endTimeString = this.stringTimeAdd(startTimeString, 1);
    }
    const id = [Number.parseInt(formDecomp[12])];

    this.addInterview(
      id,
      dateString,
      startTimeString,
      endTimeString,
      additional
    );
  }

  addInterview(
    interviewerID: number[],
    interviewDate: string,
    timeStart: string,
    timeEnd: string,
    additionalInfo: string
  ) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ADD;
    const newInterview: Interview = new Interview(
      interviewerID,
      interviewDate,
      timeStart,
      timeEnd,
      additionalInfo
    );
    this.requester
      .postRequest<Interview>(url, newInterview)
      .subscribe((returnData) => {});
  }

  getInterviewByInterviewer(events: CalendarEvent[], username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_BY_INT +
      '?username=' +
      username;
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.outputInterviewEvent(element));
      });
      return returnData;
    });
  }

  //! Only for use in calendar app
  getInterviewByRecruiter(events: CalendarEvent[], username: string) {
    console.log(`getInterviewByRecruiter() called`);
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_BY_REC +
      '?username=' +
      username;
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.outputInterviewEvent(element));
      });
      return returnData;
    });
  }

  getInterviewAll(interviews: Array<InterviewReturn>): void {
    console.log(`getInterviewAll() called`);
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      let dataArray = <Array<InterviewReturn>>(<unknown>returnData);
      dataArray.forEach((element) => {
        interviews.push(element);
      });
      return interviews;
    });
  }

  getInterviewsDashboard() {
    console.log(`getInterviewsDashboard() called`);
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  updateInterviewStatus(id: number, status: string, isStatus: boolean) {
    let url: string = '';
    if (isStatus) {
      url =
        APPCONSTANTS.APICONSTANTS.BASE_URL +
        APPCONSTANTS.APICONSTANTS.STATUS_UPDATE;
    } else {
      url =
        APPCONSTANTS.APICONSTANTS.BASE_URL +
        APPCONSTANTS.APICONSTANTS.OUTCOME_UPDATE;
    }

    let newStatus = new StatusUpdate(id, status);
    this.requester
      .postRequest<StatusUpdate>(url, newStatus)
      .subscribe((returnData) => {
        return returnData;
      });
  }
  
  getAllInterviews(): Observable<InterviewReturn[]>{
    const url =
    APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    return this.requester.getRequest<InterviewReturn[]>(url);
  }
  getAllInterviews2(): Observable<InterviewTableReturn[]>{
    const url =
    APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_ALL;
    return this.requester.getRequest<InterviewTableReturn[]>(url);
  }
}
