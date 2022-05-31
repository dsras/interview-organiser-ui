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
import { RequestCenterService } from './request-center.service';
import { getUsername } from 'src/app/shared/functions/get-user-from-local.function';

@Injectable({
  providedIn: 'root',
})
export class InterviewRequesterService {
  constructor(
    private requester: Requester,
    private rs: RequestCenterService,
    private dateFormatter: DateToStringService
  ) {}

    getInterviewsPerMonthByInterviewer(events: CalendarEvent[], username: string, start:string, end:string){
      const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER_INTER_RANGE.replace('username', username);
      let out;
      let myRange = new dateRange;
      myRange.start = start;
      myRange.end = end;
      this.requester.postRequest<dateRange>(url, myRange).subscribe((returnData) => {
        out = <Array<InterviewReturn>>(<unknown>returnData);
        out.forEach((element) => {
          //additonal filtering on output, find a way to spoof this separately
          events.push(this.outputInterviewEvent(element));
        });
        return returnData;
      });
    }


  //New function calls using new URIs
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

  outputInterviewEvent(element: InterviewReturn): CalendarEventInterview {
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
    console.log(startTime.toString());

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
      this.rs.getUsername(),
      id,
      dateString,
      startTimeString,
      endTimeString,
      additional
    );
  }

  addInterview(
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
      additionalInfo
    );
    this.requester
      .postRequest<Interview>(url, newInterview)
      .subscribe((returnData) => {});
  }

  getInterviewByInterviewer(events: CalendarEvent[], username: string) {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/' +
      username;
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
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
      '/' +
      username;
    let out;
    this.requester.getRequest<InterviewReturn>(url).subscribe((returnData) => {
      out = <Array<InterviewReturn>>(<unknown>returnData);
      out.forEach((element) => {
        //additonal filtering on output, find a way to spoof this separately
        events.push(this.outputInterviewEvent(element));
      });
      return returnData;
    });
  }

  getInterviewAll(interviews: Array<InterviewReturn>): void {
    console.log(`getInterviewAll() called`);
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER;
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
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.INTER;
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

  getAllInterviews(): Observable<InterviewReturn[]> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER +
      '/organiser/' +
      getUsername();
    return this.requester.getRequest<InterviewReturn[]>(url);
  }
}
