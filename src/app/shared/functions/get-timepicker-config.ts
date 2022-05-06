import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

/**
 * Provide a time picker config where minutes steps are of size 15
 */
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 15,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds',
  });
}
