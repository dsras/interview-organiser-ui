import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  availability,
  interviewRange,
  availabilityRange,
  availabilityForInterviews,
} from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { CalendarColors } from '../../shared/constants/colours.constant';
import { CalendarEventAvailability } from 'src/app/shared/models/calendar-event-detail';
import { AvailabilityMetaData } from 'src/app/shared/models/event-meta-data';
import { DateToStringService } from '../date-to-string.service';

/** A service to handle any requests made to the database regarding availability. */
@Injectable({
  providedIn: 'root',
})
export class AvailabilityRequesterService {
  constructor(
    private requester: Requester,
    private dateFormatter: DateToStringService
  ) {}

  /**
   * Submit new availability slot(s) to database
   * Slots are created on each day in the range from first date to last date,
   * with each slot having the same start and end time for each day.
   * If first and last are the same, one slot is created.
   *
   *
   * @param  {string} first - First date of the slot(s)
   * @param  {string} last - Last date of the slot(s)
   * @param  {string} start - The start time of each slot
   * @param  {string} end - The end time of each slot.
   * @returns void - The new range of availability is sent as a POST to database.
   */
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
  /** 
   * Takes the user's username and an array of {@link CalendarEvent} and appends
   * all current availability of that user to the array.
   * // This implementation returns nothing however it may be better to return 
   * // a new array instead of taking one as a parameter.
   * 
   * @param  {CalendarEvent[]} events - The array to push availability to
   * @param  {string} username - The name of the owner of the availability
   */
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
        events.push(this.parseAvailabilityEvent(element));
      });
      return out;
    });
  }
  
  /**
   * Return all available times for an interview with a particular skill(s)
   * @deprecated
   * 
   * @param  {Array<number>} input - the array of skill id's required
   * @returns 
   */
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
  /**
   * Returns all availability currently stored in DB,
   * called by {@link CalendarComponent}
   * 
   * TODO should a limit be set on this, say from todays date to 3 months from now?
   * 
   * @param  {CalendarEvent[]} events
   * @returns Array passed to function has been modified to conatain all availability.
   */
  getAllAvailability(events: CalendarEvent[]): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.parseAvailabilityEvent(element));
      });
      return out;
    });
  }

  /**
   * 
   * @param events 
   */
  getAllAvailabilityUI(events: string[]): void {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out: Array<availability>;

    this.requester.getRequest<availability>(url).subscribe((returnData) => {
      out = <Array<availability>>(<unknown>returnData);
      out.forEach((element) => {
        const start: Date = new Date(element.date);
        const end: Date = new Date(element.date);
        const times1: string[] = element.start_time.split(':');
        const times2: string[] = element.end_time.split(':');

        start.setHours(parseInt(times1[0]), parseInt(times1[1]));
        end.setHours(parseInt(times2[0]), parseInt(times2[1]));

        const startTime: string = this.dateToStringTime(start);
        const endTime: string = this.dateToStringTime(end);

        events.push(startTime + ' -> ' + endTime + '\n');
      });
      return out;
    });
    // out = <Array<availability>><unknown>out;
    // return out;
  }

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

  dateToStringTime(date: Date): string {
    return this.dateFormatter.dateToStringTime(date);
  }

  dateToStringDate(date: Date): string {
    return this.dateFormatter.dateToStringDate(date);
  }

  parseAvailabilityEvent(
    element: availability
  ): CalendarEventAvailability {
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
}
