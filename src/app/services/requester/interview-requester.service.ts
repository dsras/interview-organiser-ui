import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  dateRange,
  Interview,
  InterviewReturn,
  StatusUpdate,
} from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventInterview } from 'src/app/shared/models/calendar-event-detail';
import { InterviewMetaData } from 'src/app/shared/models/event-meta-data';
import { CalendarColors } from 'src/app/shared/constants/colours.constant';
import { DateToStringService } from '../date-to-string.service';
import { Observable } from 'rxjs';
import { getUsername } from 'src/app/shared/functions/get-user-from-local.function';
import { CreateInterviewFormValue } from 'src/app/shared/models/forms';

@Injectable({
  providedIn: 'root',
})
export class InterviewRequesterService {
  constructor(
    private requester: Requester,
    private dateFormatter: DateToStringService
  ) {}

  getInterviewsPerMonthByInterviewer(
    events: CalendarEvent[],
    username: string,
    start: string,
    end: string
  ) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_INTER_RANGE.replace('username', username);
    let out;
    let myRange = new dateRange();
    myRange.start = start;
    myRange.end = end;
    this.requester
      .postRequest<dateRange>(url, myRange)
      .subscribe((returnData) => {
        out = <Array<InterviewReturn>>(<unknown>returnData);
        out.forEach((element) => {
          //additonal filtering on output, find a way to spoof this separately
          events.push(this.parseInterviewUser(element));
        });
        return returnData;
      });
  }

  //New function calls using new URIs
  //! Not used
  InterviewsFindAll() {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER;
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindCompleted(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_COMP.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindConfirmed(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_CONF.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindPanelNoShow(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_PNS.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindCandidateNoShow(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_CNS.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindProgressed(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_PROG.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindNotProgressed(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_NOPROG.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  //! not used
  InterviewsFindHired(userName: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_HIRE.replace('username', userName);
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
      });
      return returnData;
    });
  }

  ///Old function calls some are still in use
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

  addInterviewForm(form: CreateInterviewFormValue) {
    let startTimeString: string;
    let endTimeString: string;

    if (form.startTime != '') {
      //set end time to be an hour after start time
      startTimeString = form.startTime;
      endTimeString = this.stringTimeAdd(startTimeString, 1);
    } else {
      startTimeString = form.interviewSelected.startTime;
      endTimeString = this.stringTimeAdd(startTimeString, 1);
    }

    this.createInterview(
      getUsername(),
      [form.interviewSelected.interviewerId],
      form.interviewSelected.date,
      startTimeString,
      endTimeString,
      form.additionalInformation
    );
  }

  createInterview(
    userName: string,
    interviewerID: number[],
    interviewDate: string,
    timeStart: string,
    timeEnd: string,
    additionalInfo: string
  ) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/' +
      userName;
    const newInterview: Interview = new Interview(
      interviewerID,
      interviewDate,
      timeStart,
      timeEnd,
      additionalInfo,
      'Pending',
      'Pending'
    );
    this.requester
      .postRequest<Interview>(url, newInterview)
      .subscribe((returnData) => {});
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

  getAllInterviews(): Observable<Array<InterviewReturn>> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/organiser/' +
      getUsername();
    return this.requester.getRequest<Array<InterviewReturn>>(url);
  }

  getUserInterviews(
    events: Array<CalendarEvent>,
    interviews: Array<CalendarEventInterview>
  ): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/' +
      getUsername();
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        const interview = this.parseInterviewUser(element);
        events.push(interview);
        interviews.push(interview);
      });
    });
  }

  getRecruiterInterviews(
    events: Array<CalendarEvent>,
    interviews: Array<CalendarEventInterview>
  ): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/organiser/' +
      getUsername();
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        const interview = this.parseInterviewRecruiter(element);
        events.push(interview);
        interviews.push(interview);
      });
    });
  }

  parseInterviewUser(element: InterviewReturn): CalendarEventInterview {
    const start = new Date(element.date);
    const end = new Date(element.date);
    const int_id = element.interviewId;
    const times1 = element.startTime.split(':');
    const times2 = element.endTime.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const newInterviewData = new InterviewMetaData({
      panel: element.interviewers,
      outcome: element.outcome,
      status: element.status,
      additional: element.additionalInfo,
    });

    const newInterview: CalendarEventInterview = {
      id: int_id,
      start: start,
      end: end,
      title: 'interview',
      color: CalendarColors.get('yellow'),
      meta: newInterviewData,
    };
    return newInterview;
  }

  parseInterviewRecruiter(element: InterviewReturn): CalendarEventInterview {
    const start = new Date(element.date);
    const end = new Date(element.date);
    const int_id = element.interviewId;
    const times1 = element.startTime.split(':');
    const times2 = element.endTime.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const newInterviewData = new InterviewMetaData({
      panel: element.interviewers,
      outcome: element.outcome,
      status: element.status,
      additional: element.additionalInfo,
    });

    const newInterview: CalendarEventInterview = {
      id: int_id,
      start: start,
      end: end,
      title: 'interview',
      color: CalendarColors.get('red'),
      meta: newInterviewData,
    };
    return newInterview;
  }
}
