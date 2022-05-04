import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';
import { EventMetaData } from './event-meta-data';

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
  interviewPanel?: Array<string>;
  color?: EventColor | undefined;
  actions?: EventAction[] | undefined;
  allDay?: boolean | undefined;
  cssClass?: string | undefined;
  resizable?:
    | { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined }
    | undefined;
  draggable?: boolean | undefined;
  meta: EventMetaData;

  /**
   * Currently the constructor for a CalendarEventDetail object takes an existing Calendarevent
   * and appends meta data to as a typed object described seperately. 
   * this can be modified and expanded as appropriate.
   * 
   * ? should a CalendarEvent be required to create an event or can it just be constructed instead ?
   * 
   * @param event the CalendarEvent to base the detailed event on
   * @param meta the metadata object containing additional typed attributes
   */
  constructor(event: CalendarEvent, meta: EventMetaData) {
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
