import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  availability,
  interviewRange,
  availabilityRange,
  availabilityForInterviews,
} from '../../common/models/types';
import { APPCONSTANTS } from '../../common/constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { CalendarColors } from '../../common/constants/colours.constant';
import { CalendarEventAvailability } from 'src/app/common/models/calendar-event-detail';
import { AvailabilityMetaData } from 'src/app/common/models/event-meta-data';
import { DateToStringService } from '../date-to-string.service';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityRequesterService {
  constructor(
    private requester: Requester,
    private dateFormatter: DateToStringService
  ) {}

  dateToStringTime(date: Date): string {
    return this.dateFormatter.dateToStringTime(date);
  }

  dateToStringDate(date: Date): string {
    return this.dateFormatter.dateToStringDate(date);
  }

  outputAvailabilityEvent(element: availability): CalendarEventAvailability {
    const start = new Date(element.date);
    const end = new Date(element.date);
    const times1 = element.start_time.split(':');
    const times2 = element.end_time.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const data = new AvailabilityMetaData();

    const newInterview: CalendarEventAvailability = {
      id: element.availability_id,
      start: start,
      end: end,
      title: 'interview',
      color: CalendarColors.blue,
      meta: data,
    };
    return newInterview;
  }

  addAvailability(
    first: string,
    last: string,
    start: string,
    end: string
  ): void {
    const firstDate: Date = new Date(first);
    const lastDate: Date = new Date(last);
    const newStart: Date = new Date(start);
    const newEnd: Date = new Date(end);

    const firstDateString: string = this.dateToStringDate(firstDate);
    const lastDateString: string = this.dateToStringDate(lastDate);

    const startString: string = this.dateToStringTime(newStart);
    const endString: string = this.dateToStringTime(newEnd);

    const newAvail: availabilityRange = new availabilityRange(
      firstDateString,
      lastDateString,
      startString,
      endString
    );
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    let out: availabilityRange;

    this.requester
      .postRequest<availabilityRange>(url, newAvail)
      .subscribe((returnData) => {
        out = <availabilityRange>(<unknown>returnData);
      });
  }

  getMyAvailability(events: CalendarEvent[], username: string): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_GET +
      '?username=' +
      username;
    let out;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.outputAvailabilityEvent(element));
      });
      return out;
    });
  }

  getAvailabilityOnSkill(input: Array<number>): void {
    let url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_SKILL;
    let started: boolean = false;
    input.forEach((element) => {
      url += (started ? ',' : '') + element.toString();
      started = true;
    });
    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      return returnData;
    });
  }

  getAllAvailability(events: CalendarEvent[]): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.outputAvailabilityEvent(element));
      });
      return out;
    });
  }

  // Currently not used
  // getAllAvailabilityUI(events: string[]): void {
  //   const url: string =
  //     APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
  //   let out: Array<availability>;

  //   this.requester.getRequest<availability>(url).subscribe((returnData) => {
  //     out = <Array<availability>>(<unknown>returnData);
  //     out.forEach((element) => {
  //       const start: Date = new Date(element.date);
  //       const end: Date = new Date(element.date);
  //       const times1: string[] = element.start_time.split(':');
  //       const times2: string[] = element.end_time.split(':');

  //       start.setHours(parseInt(times1[0]), parseInt(times1[1]));
  //       end.setHours(parseInt(times2[0]), parseInt(times2[1]));

  //       const startTime: string = this.dateToStringTime(start);
  //       const endTime: string = this.dateToStringTime(end);

  //       events.push(startTime + ' -> ' + endTime + '\n');
  //     });
  //     return out;
  //   });
  //   // out = <Array<availability>><unknown>out;
  //   // return out;
  // }

  getAvailabilityByRange(
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    skillsIDList: number[],
    interviewsReturn: string[]
  ): void {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_FILTER;
    const newStartDate: Date = new Date(startDate);
    const newEndDate: Date = new Date(endDate);
    const newStartTime: Date = new Date(startTime);
    const newEndTime: Date = new Date(endTime);

    newStartTime.setDate(newStartDate.getDate());
    newEndTime.setDate(newStartDate.getDate());

    const startDateString: string = this.dateToStringDate(newStartDate);
    const endDateString: string = this.dateToStringDate(newEndDate);
    const startString: string = this.dateToStringTime(newStartTime);
    const endString: string = this.dateToStringTime(newEndTime);

    const newRange: interviewRange = new interviewRange(
      startDateString,
      endDateString,
      startString,
      endString,
      skillsIDList
    );
    this.requester
      .postRequestNoType<availabilityForInterviews>(url, newRange)
      .subscribe((returnData) => {
        let data = <Array<availabilityForInterviews>>returnData;
        data.forEach((element) => {
          let refStart: Date = new Date(newStartTime);
          let refEnd: Date = new Date(newStartTime);
          refStart.setHours(
            Number.parseInt(element.start_time.split(':')[0]),
            Number.parseInt(element.start_time.split(':')[1])
          );
          refEnd.setHours(
            Number.parseInt(element.end_time.split(':')[0]),
            Number.parseInt(element.end_time.split(':')[1])
          );

          let startInput: string = '';
          let endInput: string = '';
          if (refStart.getTime() > newStartTime.getTime()) {
            startInput = this.dateToStringTime(refStart);
          } else {
            startInput = this.dateToStringTime(newStartTime);
          }
          if (refEnd.getTime() < newEndTime.getTime()) {
            endInput = this.dateToStringTime(refEnd);
          } else {
            endInput = this.dateToStringTime(newEndTime);
          }

          interviewsReturn.push(
            'On ' +
              element.date +
              ' between ' +
              startInput +
              ' -> ' +
              endInput +
              ' this is with: ' +
              element.interviewer +
              ' id: ' +
              element.interviewer_id
          );
        });
      });
  }
}
