import { Injectable } from '@angular/core';
import { Requester } from '../requester/requester.service';
import {
  Availability,
  InterviewRange,
  AvailabilityRange,
  AvailabilityForInterviews,
  availIdOnly,
  dateRange,
  AvailabilityArray,
} from '../../shared/models/types';
import { APPCONSTANTS } from '../../shared/constants/app.constant';
import { CalendarEvent } from 'angular-calendar';
import { CalendarColors } from '../../shared/constants/colours.constant';
import { CalendarEventAvailability } from 'src/app/shared/models/calendar-event-detail';
import { AvailabilityMetaData } from 'src/app/shared/models/event-meta-data';
import { DateToStringService } from '../date-to-string.service';
import {
  AvailabilityArrayFormValue,
  AvailabilityRangeFormValue,
  FindSlotFormValue,
  Weekday,
} from 'src/app/shared/models/forms';
import { Observable } from 'rxjs';
import { GetUserDataService } from 'src/app/services/get-user-data.service';

/** A service to handle any requests made to the database regarding availability. */
@Injectable({
  providedIn: 'root',
})
export class AvailabilityRequesterService {
  /** @ignore */
  constructor(
    private requester: Requester,
    private dateFormatter: DateToStringService,
    private userService: GetUserDataService

  ) {}

  //! NEW CALL
  deleteAvailability(id: string | number | any) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL_DEL;
    this.requester
      .postRequest<availIdOnly>(url, id)
      .subscribe((returnData) => {});
  }

  getMyAvailabilityInRange(
    username: string,
    start: string,
    end: string
  ): Observable<Array<Availability>> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_RANGE.replace('username', username);
    let out;

    let myRange = new dateRange();
    myRange.start = start;
    myRange.end = end;

    return this.requester.postRequestNoType<dateRange>(url, myRange);
    
  }

  /**
   * Submit new availability slot(s) to database
   * Slots are created on each day in the range from first date to last date,
   * with each slot having the same start and end time for each day.
   * If first and last are the same, one slot is created.
   *
   * @param {AvailabilityRangeFormValue} form availability form submitted
   */
  addAvailabilityRange(form: AvailabilityRangeFormValue): void {
    const newAvail: AvailabilityRange = new AvailabilityRange(
      this.dateToStringDate(new Date(form.firstDate)),
      this.dateToStringDate(new Date(form.lastDate)),
      this.dateToStringTime(new Date(form.startTime)),
      this.dateToStringTime(new Date(form.endTime))
    );
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL +
      '/' +
      this.userService.getUsername();

    let out: AvailabilityRange;

    this.requester
      .postRequest<AvailabilityRange>(url, newAvail)
      .subscribe((returnData) => {
        out = <AvailabilityRange>(<unknown>returnData);
      });
  }

  addAvailabilityArray(form: AvailabilityArrayFormValue) {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL_REC_RANGE +
      this.userService.getUsername();

    const startTime = new Date(form.startTime);
    const endTime = new Date(form.endTime);

    const newAvail: AvailabilityArray = new AvailabilityArray(
      this.dateFormatter.dateToStringTime(startTime),
      this.dateFormatter.dateToStringTime(endTime),
      this.generateDateArray(form.days, form.weeks)
    );

    this.requester
      .postRequest<AvailabilityArray>(url, newAvail)
      .subscribe((returnData) => {});
  }

  /**
   * Takes two arrays of calendar events and appends
   * all current availability of the user to the arrays.
   *
   * @param { CalendarEvent[] } events - The array of events for the calendar to display
   * @param { CalendarEventAvailability[] } availability - the array of availability
   */
  getUserAvailability(
    events: Array<CalendarEvent>,
    availability: Array<CalendarEvent>
  ): void {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.AVAIL +
      '/' +
      this.userService.getUsername();

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      let data = <Array<Availability>>(<unknown>returnData);
      data.forEach((element) => {
        let event = this.parseAvailabilityUser(element);
        events.push(event);
        availability.push(event);
      });
    });
  }

  getRecruiterAvailability(): Observable<Array<Availability>> {
    const url =
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL;

    return this.requester.getRequest<Availability[]>(url);
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
      APPCONSTANTS.APICONSTANTS.AVAIL +
      '?ids=' +
      input.toString();
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
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL;
    let out;

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      out = <Array<Availability>>(<unknown>returnData);
      out.forEach((element) => {
        events.push(this.parseAvailabilityUser(element));
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
      APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.AVAIL;
    let out: Array<Availability>;

    this.requester.getRequest<Availability>(url).subscribe((returnData) => {
      out = <Array<Availability>>(<unknown>returnData);
      out.forEach((element) => {
        const start: Date = new Date(element.date);
        const end: Date = new Date(element.date);
        const times1: string[] = element.startTime.split(':');
        const times2: string[] = element.endTime.split(':');

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
  getInterviewSlots(
    form: FindSlotFormValue,
    skillsIDList: number[],
    interviewsReturn: AvailabilityForInterviews[]
  ): void {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_INTER;

    const newStartDate: Date = new Date(form.firstDate);
    const newEndDate: Date = new Date(form.lastDate);
    const newStartTime: Date = new Date();
    const newEndTime: Date = new Date();
    let times1 = form.startTime.split(':');
    let times2 = form.endTime.split(':');

    newStartTime.setHours(parseInt(times1[0]),parseInt(times1[1]));
    newEndTime.setHours(parseInt(times2[0]),parseInt(times2[1]));

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
            Number.parseInt(element.startTime.split(':')[0]),
            Number.parseInt(element.startTime.split(':')[1])
          );
          refEnd.setHours(
            Number.parseInt(element.endTime.split(':')[0]),
            Number.parseInt(element.endTime.split(':')[1])
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

          interviewsReturn.push(element);
        });
      });
  }

  getSlots(form: FindSlotFormValue, skills: number[]): Observable<any> {
    const url: string =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      APPCONSTANTS.APICONSTANTS.INTER_INTER;

    const newStartDate: Date = new Date(form.firstDate);
    const newEndDate: Date = new Date(form.lastDate);
    const newStartTime: Date = new Date();
    const newEndTime: Date = new Date();
    let times1 = form.startTime.split(':');
    let times2 = form.endTime.split(':');


    newStartTime.setHours(parseInt(times1[0]),parseInt(times1[1]));
    newEndTime.setHours(parseInt(times2[0]),parseInt(times2[1]));

    const startDateString: string = this.dateToStringDate(newStartDate);
    const endDateString: string = this.dateToStringDate(newEndDate);
    const startString: string = this.dateToStringTime(newStartTime);
    const endString: string = this.dateToStringTime(newEndTime);

    const newRange: InterviewRange = new InterviewRange(
      startDateString,
      endDateString,
      startString,
      endString,
      skills
    );
    return this.requester.postRequestNoType<AvailabilityForInterviews>(
      url,
      newRange
    );
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
   * Takes an array of dates and duplicates them for the number of weeks
   * before converting to strings "YYY-MM-DD" and returning.
   */
  generateDateArray(days: Array<Weekday>, weeks: number): string[] {
    let outputArray: string[] = [];
    days.forEach((day) => {
      let outputDate = new Date(day.weekday);
      const date = outputDate.getDate();
      for (let i = 0; i < weeks; i++) {
        outputDate.setDate(7 * i + date);
        outputArray.push(this.dateToStringDate(outputDate));
      }
    });
    return outputArray;
  }

  /**
   * Takes an Availability object and outputs the information in an object to be
   * displayed in the calendar
   *
   * @param availability the object to be converted to a calendar event
   * @returns a calendar event to be displayed in the calendar
   */
  parseAvailabilityUser(
    availability: Availability
  ): CalendarEventAvailability {
    const start = new Date(availability.date);
    const end = new Date(availability.date);
    const times1 = availability.startTime.split(':');
    const times2 = availability.endTime.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const data = new AvailabilityMetaData();

    const newAvailability: CalendarEventAvailability = {
      id: availability.availabilityId,
      start: start,
      end: end,
      title: 'availability',
      color: CalendarColors.get('blue'),
      meta: data,
    };
    return newAvailability;
  }

  parseAvailabilityRecruiter(
    availability: Availability
  ): CalendarEventAvailability {
    const start = new Date(availability.date);
    const end = new Date(availability.date);
    const times1 = availability.startTime.split(':');
    const times2 = availability.endTime.split(':');

    start.setHours(parseInt(times1[0]), parseInt(times1[1]));
    end.setHours(parseInt(times2[0]), parseInt(times2[1]));

    const data = new AvailabilityMetaData();

    const newAvailability: CalendarEventAvailability = {
      id: availability.availabilityId,
      start: start,
      end: end,
      title: 'availability',
      color: CalendarColors.get('purple'),
      meta: data,
    };
    return newAvailability;
  }
}
