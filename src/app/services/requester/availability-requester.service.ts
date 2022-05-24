import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  Availability,
  InterviewRange,
  AvailabilityRange,
  AvailabilityForInterviews,
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
  /** @ignore */
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
    const newAvail: AvailabilityRange = new AvailabilityRange(
      this.dateToStringDate(new Date(first)),
      this.dateToStringDate(new Date(last)),
      this.dateToStringTime(new Date(start)),
      this.dateToStringTime(new Date(end))
    );
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ADD;
    let out: AvailabilityRange;

    this.requester
      .postRequest<AvailabilityRange>(url, newAvail)
      .subscribe((returnData) => {
        out = <AvailabilityRange>(<unknown>returnData);
      });
  }
  /**
   * Takes the user's username and an array of calendar events and appends
   * all current availability of that user to the array.
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

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      out = <Array<Availability>>(<unknown>returnData);
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
   * @returns void
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
    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
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

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      out = <Array<Availability>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.parseAvailabilityEvent(element));
      });
      return out;
    });
  }

  /**
   * TODO still required?
   * @param {Array<string>} events
   */
  getAllAvailabilityUI(events: string[]): void {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_ALL;
    let out: Array<Availability>;

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      out = <Array<Availability>>(<unknown>returnData);
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
  }

  /**
   * Populates an input array with availability in a specified range that can
   * be used to create interviews.
   *
   * @param {string} startDate
   * @param {string} endDate
   * @param {string} startTime
   * @param {string} endTime
   * @param {Array<number>} skillsIDList
   * @param {Array<string>} interviewsReturn
   * @returns {void} Modified interviewsReturn with all relevant availability
   */
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

    const newRange: InterviewRange = new InterviewRange(
      startDateString,
      endDateString,
      startString,
      endString,
      skillsIDList
    );
    this.requester
      .postRequestNoType<AvailabilityForInterviews>(url, newRange)
      .subscribe((returnData) => {
        let data = <Array<AvailabilityForInterviews>>returnData;
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

  /**
   * Retrives a string representation of the time from a Date object
   * 
   * @param date the date to have the time represented as a string
   * @returns the string representation of the time
   */
  dateToStringTime(date: Date): string {
    return this.dateFormatter.dateToStringTime(date);
  }

  /**
   * Retrives a string representation of the date from a Date object
   * 
   * @param date the date to have the date represented as a string
   * @returns the string representation of the date
   */
  dateToStringDate(date: Date): string {
    return this.dateFormatter.dateToStringDate(date);
  }

  /**
   * Takes an Availability object and outputs the information in an object to be 
   * displayed in the calendar
   * 
   * @param availability the object to be converted to a calendar event 
   * @returns a calendar event to be displayed in the calendar
   */
  parseAvailabilityEvent(availability: Availability): CalendarEventAvailability {
    const start = new Date(availability.date);
    const end = new Date(availability.date);
    const times1 = availability.start_time.split(':');
    const times2 = availability.end_time.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const data = new AvailabilityMetaData();

    const newAvailability: CalendarEventAvailability = {
      id: availability.availability_id,
      start: start,
      end: end,
      title: 'availability',
      color: CalendarColors.blue,
      meta: data,
    };
    return newAvailability;
  }
}
