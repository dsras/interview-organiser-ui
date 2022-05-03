import { CalendarEvent } from 'angular-calendar';
import { EventColor, EventAction } from 'calendar-utils';

/**
 * This class can be used to store additional data inside events that can be typed 
 * instead of overloading the default CalendarEvent meta property which has type (any | null)
 * 
 * @author Daniel Jones
 */
export class CalendarEventDetail implements CalendarEvent {
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
  meta?: any;

  /**
   * Creates a detailed event from a CalendarEvent with potential additional params
   * 
   * TODO add further params that may be required as properties of events in a calendar
   * 
   * @param  {CalendarEvent} event
   * * the CalendarEvent to inherit properties from 
   * 
   * @param  {['']} panel
   * *  the interview panel for the CalendarEvent
   * 
   */
  constructor(event: CalendarEvent, panel?: ['']) {
    this.id = event.id;
    this.start = event.start;
    this.end = event.end;
    this.title = event.title;
    this.interviewPanel = panel;
    this.color = event.color;
    this.actions = event.actions;
    this.allDay = event.allDay;
    this.cssClass = event.cssClass;
    this.resizable = event.resizable;
    this.draggable = event.draggable;
    this.meta = event.meta;
  }
}
