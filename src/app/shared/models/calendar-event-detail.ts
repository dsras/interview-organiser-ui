import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';
import { AvailabilityMetaData, InterviewMetaData } from './event-meta-data';

/**
 * This class can be used to store additional data inside events that can be typed
 * instead of using the default CalendarEvent meta property which has type (any | null).
 * Additional parameters can be stroed within the meta object.
 *
 */
export class CalendarEventInterview implements CalendarEvent {
  /** Maybe change this to only be of type number */
  id?: string | number | undefined;
  start: Date;
  end?: Date | undefined;
  title: string;
  color?: EventColor | undefined;
  actions?: EventAction[] | undefined;
  allDay?: boolean | undefined;
  cssClass?: string | undefined;
  resizable?:
    | { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined }
    | undefined;
  draggable?: boolean | undefined;
  meta: InterviewMetaData;

  /**
   * Currently the constructor for a CalendarEventInterview object takes an
   * existing Calendarevent and appends meta data to as a typed object
   * described seperately.
   * This can be modified and expanded as appropriate.
   *
   * ? should a CalendarEvent be required to create an event or can it just be constructed instead ?
   *
   * @param event the CalendarEvent to base the detailed event on
   * @param meta the metadata object containing additional typed attributes
   */
  constructor(event: CalendarEvent, meta: InterviewMetaData) {
    this.id = event.id;
    this.start = event.start;
    this.end = event.end;
    this.title = event.title;
    this.color = event.color;
    this.actions = event.actions;
    this.allDay = event.allDay;
    this.cssClass = event.cssClass;
    this.resizable = event.resizable;
    this.draggable = event.draggable;
    this.meta = meta;
  }
}

/**
 * This class can be used to store additional data inside events that can be typed
 * instead of using the default CalendarEvent meta property which has type (any | null).
 * Additional parameters can be stroed within the meta object.
 *
 */
export class CalendarEventAvailability implements CalendarEvent {
  /** Maybe change this to only be of type number */
  id?: string | number | undefined;
  start: Date;
  end?: Date | undefined;
  title: string;
  interviewer?: string;
  color?: EventColor | undefined;
  actions?: EventAction[] | undefined;
  allDay?: boolean | undefined;
  cssClass?: string | undefined;
  resizable?:
    | { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined }
    | undefined;
  draggable?: boolean | undefined;
  meta?: AvailabilityMetaData;

  /**
   * Currently the constructor for a CalendarEventAvailability object takes an existing Calendarevent
   * and appends meta data to as a typed object described seperately.
   * this can be modified and expanded as appropriate.
   *
   * ? should a CalendarEvent be required to create an event or can it just be constructed instead ?
   *
   * @param event the CalendarEvent to base the detailed event on
   * @param meta the metadata object containing additional typed attributes
   */
  constructor(event: CalendarEvent, meta: AvailabilityMetaData) {
    this.id = event.id;
    this.start = event.start;
    this.end = event.end;
    this.title = event.title;
    this.color = event.color;
    this.actions = event.actions;
    this.allDay = event.allDay;
    this.cssClass = event.cssClass;
    this.resizable = event.resizable;
    this.draggable = event.draggable;
    this.meta = meta;
  }
}

export class DayCellRecruiter implements CalendarMonthViewDay {
  inMonth: boolean;
  events: CalendarEvent<any>[];
  backgroundColor?: string | undefined;
  badgeTotal: number;
  meta?: any;
  date: Date;
  day: number;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
  cssClass?: string | undefined;
  eventGroups: string[];

  constructor(viewDay: CalendarMonthViewDay, eventGroups?: string[]) {
    this.inMonth = viewDay.inMonth;
    this.events = viewDay.events;
    this.backgroundColor = viewDay.backgroundColor;
    this.badgeTotal = viewDay.badgeTotal;
    this.meta = viewDay.meta;
    this.date = viewDay.date;
    this.day = viewDay.day;
    this.isPast = viewDay.isPast;
    this.isToday = viewDay.isToday;
    this.isFuture = viewDay.isFuture;
    this.isWeekend = viewDay.isWeekend;
    this.cssClass = viewDay.cssClass;
    this.eventGroups = eventGroups ? eventGroups : [];
  }
}
