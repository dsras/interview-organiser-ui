import { CalendarEvent } from "angular-calendar";
import { EventColor, EventAction } from "calendar-utils";

// This class can be used to fix problems later if you need calendar events to carry additional information
export class CalendarEventDetail implements CalendarEvent{
    id?: string | number | undefined;
    start: Date;
    end?: Date | undefined;
    title: string;
    interviewPanel?: Array<string>
    color?: EventColor | undefined;
    actions?: EventAction[] | undefined;
    allDay?: boolean | undefined;
    cssClass?: string | undefined;
    resizable?: { beforeStart?: boolean | undefined; afterEnd?: boolean | undefined; } | undefined;
    draggable?: boolean | undefined;
    meta?: any;

    constructor(event: CalendarEvent, panel?: ['']) {
        this.id = event.id;
        this.start = event.start
        this.end = event.end
        this.title = event.title
        this.interviewPanel = panel
        this.color = event.color
        this.actions = event.actions
        this.allDay = event.allDay
        this.cssClass = event.cssClass
        this.resizable = event.resizable
        this.draggable = event.draggable
        this.meta = event.meta
    }


}